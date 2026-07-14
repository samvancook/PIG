import AppKit
import CoreGraphics
import Foundation
import ImageIO

struct Variant {
  let source: String
  let crop: CGRect?
  let output: String
}

let closePage = "/Users/buttonpublishingone/Downloads/ChatGPT Image Jun 30, 2026, 03_12_12 PM.png"
let collage = "/Users/buttonpublishingone/Downloads/ChatGPT Image Jun 30, 2026, 03_11_43 PM.png"
let outputDir = "assets/backgrounds"
let targetWidth = 2160
let targetHeight = 2700

let variants = [
  Variant(source: closePage, crop: nil, output: "printed-book-close-page.jpg"),
  Variant(source: collage, crop: CGRect(x: 0, y: 652, width: 603, height: 652), output: "printed-book-open-spread.jpg"),
  Variant(source: collage, crop: CGRect(x: 603, y: 0, width: 603, height: 652), output: "printed-book-right-page.jpg"),
  Variant(source: collage, crop: CGRect(x: 0, y: 0, width: 603, height: 652), output: "printed-book-flat-open.jpg"),
  Variant(source: collage, crop: CGRect(x: 603, y: 652, width: 603, height: 652), output: "printed-book-right-wood.jpg"),
]

try FileManager.default.createDirectory(atPath: outputDir, withIntermediateDirectories: true)

func cgImage(from path: String) -> CGImage {
  guard let image = NSImage(contentsOfFile: path),
        let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    fatalError("Could not load image at \(path)")
  }
  return cg
}

func drawAspectFill(_ image: CGImage, in context: CGContext) {
  let scale = max(CGFloat(targetWidth) / CGFloat(image.width), CGFloat(targetHeight) / CGFloat(image.height))
  let drawWidth = CGFloat(image.width) * scale
  let drawHeight = CGFloat(image.height) * scale
  let drawX = (CGFloat(targetWidth) - drawWidth) / 2
  let drawY = (CGFloat(targetHeight) - drawHeight) / 2
  context.interpolationQuality = .high
  context.draw(image, in: CGRect(x: drawX, y: drawY, width: drawWidth, height: drawHeight))
}

for variant in variants {
  var source = cgImage(from: variant.source)
  if let crop = variant.crop, let cropped = source.cropping(to: crop) {
    source = cropped
  }

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
    fatalError("Could not create image context.")
  }

  drawAspectFill(source, in: context)

  let outputPath = "\(outputDir)/\(variant.output)"
  guard let outputCg = context.makeImage(),
        let destination = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outputPath) as CFURL, kUTTypeJPEG, 1, nil) else {
    fatalError("Could not create output \(outputPath)")
  }

  CGImageDestinationAddImage(destination, outputCg, [kCGImageDestinationLossyCompressionQuality: 0.92] as CFDictionary)
  if !CGImageDestinationFinalize(destination) {
    fatalError("Could not write \(outputPath)")
  }
  print(outputPath)
}
