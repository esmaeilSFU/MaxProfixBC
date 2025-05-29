# Create assets directory if it doesn't exist
if (-not (Test-Path "assets")) {
    New-Item -ItemType Directory -Path "assets"
}

# Download hero background image - Modern bathroom
$heroUrl = "https://images.unsplash.com/photo-1584622781860-6d5c6c9b3b3a?q=80&w=1920&auto=format&fit=crop"
Invoke-WebRequest -Uri $heroUrl -OutFile "assets/hero-bg.jpg"

# Download before/after images - Bathtub repair examples
$beforeUrl = "https://images.unsplash.com/photo-1584622781860-6d5c6c9b3b3a?q=80&w=800&auto=format&fit=crop"
$afterUrl = "https://images.unsplash.com/photo-1584622781860-6d5c6c9b3b3b?q=80&w=800&auto=format&fit=crop"
Invoke-WebRequest -Uri $beforeUrl -OutFile "assets/before1.jpg"
Invoke-WebRequest -Uri $afterUrl -OutFile "assets/after1.jpg"

# Download testimonial profile photos
$testimonial1Url = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
$testimonial2Url = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
Invoke-WebRequest -Uri $testimonial1Url -OutFile "assets/testimonial1.jpg"
Invoke-WebRequest -Uri $testimonial2Url -OutFile "assets/testimonial2.jpg"

# Create a simple favicon
$faviconUrl = "https://raw.githubusercontent.com/feathericons/feather/master/icons/tool.svg"
Invoke-WebRequest -Uri $faviconUrl -OutFile "assets/favicon.ico"

Write-Host "All images have been downloaded to the assets directory." 