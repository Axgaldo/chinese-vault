# Carpeta de audio generada

Los MP3 de esta carpeta **no se commitean a Git** (`.gitignore`).

Se generan automáticamente desde el contenido del curso (`src/content/`) con:

```bash
npm run audio        # genera solo lo que falte
npm run audio:force  # regenera todo
```

Usa el servicio TTS gratuito de Microsoft Edge (voz `zh-CN-XiaoxiaoNeural`)
a través del paquete `msedge-tts`. Si un MP3 no existe, la app hace fallback
automático a la Web Speech API del navegador.
