import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

export function Instructions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Oyun Yönergeleri</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <HelpCircle className="w-5 h-5 text-green-500" />
            Simülasyon Modu
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Hız butonlarını kullanarak aracın hızını ayarlayın</li>
            <li>Başlat butonuna basarak simülasyonu çalıştırın</li>
            <li>Grafikler üzerinden hareket analizini takip edin</li>
            <li>İstediğiniz zaman simülasyonu durdurup yeniden başlatabilirsiniz</li>
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            Soru Modu
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Kolay (10 puan), Orta (20 puan) ve Zor (30 puan) zorluk seviyeleri</li>
            <li>Her seviyede 5 soru bulunur</li>
            <li>Yanlış cevaplarda ipucu alabilirsiniz</li>
            <li>Doğru cevap sonrası açıklamayı okuyabilirsiniz</li>
            <li>Toplam puanınızı takip edin ve en yüksek skoru hedefleyin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}