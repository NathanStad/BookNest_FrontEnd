<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'scan', result: string): void;
}>();

const scanning = ref(false);
let html5QrCode: Html5Qrcode;

onMounted(async () => {
  html5QrCode = new Html5Qrcode("qr-reader");
  
  try {
    scanning.value = true;
    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 15,
        qrbox: { width: 280, height: 100 },
        formatsToSupport: [Html5QrcodeScanType.EAN_13]
      },
      (decodedText) => {
        emit('scan', decodedText);
        stopScanner();
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  } catch (err) {
    console.error(err);
  }
});

const stopScanner = async () => {
  if (html5QrCode && scanning.value) {
    try {
      await html5QrCode.stop();
      scanning.value = false;
    } catch (err) {
      console.error(err);
    }
  }
  emit('close');
};

onUnmounted(() => {
  stopScanner();
});
</script>

<template>
  <div class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
    <div class="bg-background rounded-2xl p-6 mx-4 w-full max-w-sm">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-title font-medium">Scanner un code ISBN</h2>
        <button 
          @click="stopScanner"
          class="w-8 h-8 rounded-full bg-title/10 flex items-center justify-center"
        >
          <span class="material-icons text-title">close</span>
        </button>
      </div>

      <!-- Scanner -->
      <div 
        id="qr-reader" 
        class="rounded-lg overflow-hidden bg-black/5 aspect-square w-full"
      ></div>

      <!-- Instructions -->
      <p class="text-title/70 text-sm text-center mt-4">
        Placez le code-barres ISBN dans le cadre pour le scanner
      </p>
    </div>
  </div>
</template>

<style scoped>
#qr-reader {
  width: 100% !important;
}

#qr-reader video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  border-radius: 0.5rem;
}

#qr-reader__scan_region {
  position: relative !important;
  min-height: unset !important;
}

#qr-reader__scan_region img {
  display: none;
}

#qr-reader__dashboard {
  padding: 0 !important;
}

#qr-reader__dashboard_section_csr button {
  display: none;
}

#qr-reader__status_span {
  display: none;
}
</style>