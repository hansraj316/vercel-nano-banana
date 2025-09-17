import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] API: Starting image generation request")

    const formData = await request.formData()
    const mode = formData.get("mode") as string
    const prompt = formData.get("prompt") as string

    console.log("[v0] API: Mode:", mode)
    console.log("[v0] API: Prompt:", prompt)

    if (!mode || !prompt) {
      console.log("[v0] API: Missing required fields")
      return NextResponse.json({ error: "Mode and prompt are required" }, { status: 400 })
    }

    let result: any

    if (mode === "text-to-image") {
      console.log("[v0] API: Using text-to-image mode")

      const response = await fetch("https://api.nano-banana.com/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NANO_BANANA_API_KEY || "demo-key"}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          num_images: 1,
          output_format: "jpeg",
        }),
      })

      const responseText = await response.text()
      console.log("[v0] API: Raw response:", responseText)

      if (!response.ok) {
        console.log("[v0] API: Error response:", responseText)
        throw new Error(`API request failed: ${response.status} - ${responseText}`)
      }

      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.log("[v0] API: Failed to parse JSON, response was:", responseText)
        throw new Error(`Invalid JSON response from API: ${responseText}`)
      }
    } else if (mode === "image-editing") {
      console.log("[v0] API: Using image-editing mode")

      const image1 = formData.get("image1") as File
      const image2 = formData.get("image2") as File

      if (!image1 || !image2) {
        console.log("[v0] API: Missing images for editing mode")
        return NextResponse.json({ error: "Two images are required for editing mode" }, { status: 400 })
      }

      console.log("[v0] API: Uploading images to Vercel Blob")

      const [blob1, blob2] = await Promise.all([
        put(`image1-${Date.now()}.${image1.name.split(".").pop()}`, image1, {
          access: "public",
        }),
        put(`image2-${Date.now()}.${image2.name.split(".").pop()}`, image2, {
          access: "public",
        }),
      ])

      const image1Url = blob1.url
      const image2Url = blob2.url

      console.log("[v0] API: Image1 public URL:", image1Url)
      console.log("[v0] API: Image2 public URL:", image2Url)

      const response = await fetch("https://api.nano-banana.com/v1/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NANO_BANANA_API_KEY || "demo-key"}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          image_urls: [image1Url, image2Url],
        }),
      })

      const responseText = await response.text()
      console.log("[v0] API: Raw response:", responseText)

      if (!response.ok) {
        console.log("[v0] API: Error response:", responseText)
        throw new Error(`API request failed: ${response.status} - ${responseText}`)
      }

      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.log("[v0] API: Failed to parse JSON, response was:", responseText)
        throw new Error(`Invalid JSON response from API: ${responseText}`)
      }
    } else {
      console.log("[v0] API: Invalid mode:", mode)
      return NextResponse.json({ error: "Invalid mode. Must be 'text-to-image' or 'image-editing'" }, { status: 400 })
    }

    console.log("[v0] API: Nano-banana response received")
    console.log("[v0] API: Result data:", JSON.stringify(result, null, 2))

    if (!result || !result.images || result.images.length === 0) {
      console.log("[v0] API: No images in response")
      throw new Error("No images generated")
    }

    const imageUrl = result.images[0].url
    const description = result.description || ""

    console.log("[v0] API: Generated image URL:", imageUrl)
    console.log("[v0] API: AI Description:", description)

    return NextResponse.json({
      url: imageUrl,
      prompt: prompt,
      description: description,
    })
  } catch (error) {
    console.error("[v0] API: Error generating image:", error)
    console.error("[v0] API: Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
