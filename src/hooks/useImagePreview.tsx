import { useEffect } from 'react';

function useImagePreview(inputId: string, previewId: string) {
  useEffect(() => {
    const imageInput = document.getElementById(inputId) as HTMLInputElement;
    const imagePreview = document.getElementById(previewId) as HTMLImageElement;

    const handleImageChange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
          }
        };

        reader.readAsDataURL(file);
      }
    };

    if (imageInput) {
      imageInput.addEventListener('change', handleImageChange);
    }

    return () => {
      if (imageInput) {
        imageInput.removeEventListener('change', handleImageChange);
      }
    };
  }, [inputId, previewId]);
}

export default useImagePreview;
