# Custom Photos Folder

Place your custom photos in this folder (`/public/photos/`).

## How to use your custom photos:

1. **Upload / Add Photos**:
   - Use the file explorer in the editor to upload or add image files (e.g., `skardu-tour.jpg`, `fleet-prado.jpg`, `logo.jpg`) into `public/photos/`.

2. **Reference in Code or Components**:
   - In any component, reference your photos using the relative path starting with `/photos/`:
     ```html
     <img src="/photos/skardu-tour.jpg" alt="Custom Skardu Tour" />
     ```
   - You can replace default Unsplash URLs in `src/components/Destinations.tsx`, `src/components/Fleet.tsx`, or `src/components/Hero.tsx` with your custom photo paths like `/photos/my-photo.jpg`.

3. **Supported Formats**:
   - `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`, `.gif`
