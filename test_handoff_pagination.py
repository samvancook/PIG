import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse
import api_server

class HandoffPaginationTests(unittest.TestCase):
    def test_finds_new_requests_after_first_500_even_without_next_cursor(self):
        ids = [f'old-{i}' for i in range(500)] + ['probe-trees','probe-black-movie','probe-guante','probe-dust']
        calls = []
        def fetch(url, headers):
            q = parse_qs(urlparse(url).query); offset = int(q['cursor'][0]); size = int(q['limit'][0]); calls.append(offset)
            return {'ok':True,'records':[{'graphicsRequestId':i} for i in ids[offset:offset+size]],'nextCursor':''}, {}
        with patch.object(api_server,'fetch_json_via_curl_with_metrics',side_effect=fetch):
            result,_ = api_server.fetch_handoff_queue_pages('https://weaver.test/queue?filter=all',5000)
        self.assertEqual(calls,[0,500]); self.assertEqual(len(result['records']),504)
        self.assertEqual(result['records'][-1]['graphicsRequestId'],'probe-dust')

    def test_normal_first_page_stays_bounded(self):
        with patch.object(api_server,'fetch_json_via_curl_with_metrics',return_value=({'ok':True,'records':[{}]*50},{})) as fetch:
            result,_=api_server.fetch_handoff_queue_pages('https://weaver.test/queue?filter=current_titles',50)
        self.assertEqual(len(result['records']),50);self.assertEqual(fetch.call_count,1)

    def test_failed_page_is_not_silently_an_empty_search(self):
        with patch.object(api_server,'fetch_json_via_curl_with_metrics',return_value=({'ok':False},{})):
            with self.assertRaises(RuntimeError):api_server.fetch_handoff_queue_pages('https://weaver.test/queue',5000)

    def test_nonadvancing_cursor_stops_instead_of_looping(self):
        with patch.object(api_server,'fetch_json_via_curl_with_metrics',side_effect=[({'records':[{}]*500,'nextCursor':'500'},{}),({'records':[{}]*500,'nextCursor':'500'}, {})]):
            with self.assertRaisesRegex(RuntimeError,'did not advance'):api_server.fetch_handoff_queue_pages('https://weaver.test/queue',5000)

if __name__=='__main__': unittest.main()
