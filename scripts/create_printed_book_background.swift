import AppKit
import CoreGraphics
import Foundation
import ImageIO

let sourcePath = "/Users/buttonpublishingone/Downloads/Gibson - YBBL - INT - AFTER THE BREAK-UP, OUR TANDEM BIKE SPEAKS_ 1.jpg"
let outputPath = "assets/backgrounds/printed-book-page-gibson.jpg"
let targetWidth = 2160
let targetHeight = 2700

guard let sourceImage = NSImage(contentsOfFile: sourcePath),
      let sourceCg = sourceImage.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
  fatalError("Could not load source image.")
}

try FileManager.default.createDirectory(
  atPath: (outputPath as NSString).deletingLastPathComponent,
  withIntermediateDirectories: true
)
FileManager.default.createFile(atPath: outputPath, contents: nil)

let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
  data: nil,
  width: targetWidth,
  height: targetHeight,
  bitsPerComponent: 8,
  bytesPerRow: 0,
  space: colorSpace,
  bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
  fatalError("Could not create output context.")
}

context.interpolationQuality = .high
context.setFillColor(CGColor(red: 0.93, green: 0.92, blue: 0.90, alpha: 1))
context.fill(CGRect(x: 0, y: 0, width: targetWidth, height: targetHeight))

let scale = max(CGFloat(targetWidth) / CGFloat(sourceCg.width), CGFloat(targetHeight) / CGFloat(sourceCg.height))
let drawWidth = CGFloat(sourceCg.width) * scale
let drawHeight = CGFloat(sourceCg.height) * scale
let drawX = (CGFloat(targetWidth) - drawWidth) / 2
let drawY = (CGFloat(targetHeight) - drawHeight) / 2
context.draw(sourceCg, in: CGRect(x: drawX, y: drawY, width: drawWidth, height: drawHeight))

func paperColor(_ alpha: CGFloat) -> CGColor {
  CGColor(red: 0.925, green: 0.925, blue: 0.91, alpha: alpha)
}

let printablePageRect = CGRect(x: 250, y: 0, width: 1495, height: 2700)

// Replace the source text area with a resized sample from the blank right side
// of the same photographed page, preserving paper grain and light falloff.
let blankPaperSample = CGRect(x: 1260, y: 150, width: 355, height: 1720)
if let paperPatch = sourceCg.cropping(to: blankPaperSample) {
  context.draw(paperPatch, in: printablePageRect)
  context.draw(paperPatch, in: CGRect(x: 250, y: 2320, width: 1495, height: 380))
}

context.setFillColor(paperColor(0.2))
context.fill(printablePageRect)

// Reintroduce deterministic paper grain over the cleaned text area.
for y in stride(from: 65, to: targetHeight - 70, by: 7) {
  for x in stride(from: 285, to: 1680, by: 9) {
    let raw = sin(Double(x) * 12.9898 + Double(y) * 78.233) * 43758.5453
    let fraction = raw - floor(raw)
    let alpha = CGFloat(0.018 + fraction * 0.038)
    let warm = CGFloat(0.88 + fraction * 0.04)
    context.setFillColor(CGColor(red: warm, green: warm, blue: warm * 0.985, alpha: alpha))
    context.fill(CGRect(x: x, y: y, width: 2, height: 1))
  }
}

// Soft page-shadow reinforcement, matching the reference's left gutter and right page edge.
let leftGradient = CGGradient(
  colorsSpace: colorSpace,
  colors: [
    CGColor(red: 0.05, green: 0.045, blue: 0.04, alpha: 0.26),
    CGColor(red: 0.4, green: 0.38, blue: 0.34, alpha: 0.08),
    CGColor(red: 1, green: 1, blue: 1, alpha: 0.0),
  ] as CFArray,
  locations: [0, 0.46, 1]
)!
context.drawLinearGradient(
  leftGradient,
  start: CGPoint(x: 0, y: 0),
  end: CGPoint(x: 360, y: 0),
  options: []
)

let rightGradient = CGGradient(
  colorsSpace: colorSpace,
  colors: [
    CGColor(red: 1, green: 1, blue: 1, alpha: 0.0),
    CGColor(red: 0.18, green: 0.15, blue: 0.13, alpha: 0.14),
  ] as CFArray,
  locations: [0, 1]
)!
context.drawLinearGradient(
  rightGradient,
  start: CGPoint(x: 1930, y: 0),
  end: CGPoint(x: CGFloat(targetWidth), y: 0),
  options: []
)

context.setFillColor(CGColor(red: 0.91, green: 0.915, blue: 0.9, alpha: 0.96))
context.fill(CGRect(x: 250, y: 2520, width: 1495, height: 180))

guard let outputCg = context.makeImage(),
      let destination = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outputPath) as CFURL, kUTTypeJPEG, 1, nil) else {
  fatalError("Could not create output image.")
}

CGImageDestinationAddImage(destination, outputCg, [kCGImageDestinationLossyCompressionQuality: 0.9] as CFDictionary)
if !CGImageDestinationFinalize(destination) {
  fatalError("Could not write output image.")
}

print(outputPath)
