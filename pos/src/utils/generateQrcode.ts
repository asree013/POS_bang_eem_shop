import QRCode from 'qrcode';

// Function to generate PromptPay QR Code data
const generatePromptPayQRCode = async (phoneNumber: string, amount?: number): Promise<string> => {
  const payloadFormatIndicator = '000201'; // Format Indicator
  const pointOfInitiationMethod = '010212'; // Static QR
  const phoneNumberFormatted = phoneNumber.startsWith('66') 
    ? phoneNumber 
    : `66${phoneNumber.slice(1)}`; // Convert 08x to 668x for Thai numbers
  const merchantAccountInfo = `2937A000000677010111${phoneNumberFormatted}`; // PromptPay with Thai Bank identifier
  const transactionAmount = amount 
    ? `54${String(amount.toFixed(2)).length.toString().padStart(2, '0')}${amount.toFixed(2)}` 
    : '';
  const countryCode = '5802TH';
  const crc16Placeholder = '6304'; // CRC16 Checksum placeholder

  const rawData = `${payloadFormatIndicator}${pointOfInitiationMethod}${merchantAccountInfo}${transactionAmount}${countryCode}${crc16Placeholder}`;
  
  const checksum = calculateCRC16(rawData);

  const fullData = rawData + checksum;

  return QRCode.toDataURL(fullData); // Generate QR Code as Data URL
};

// Function to calculate CRC16 checksum
const calculateCRC16 = (data: string): string => {
  let crc = 0xFFFF;

  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return ((crc & 0xFFFF).toString(16).toUpperCase()).padStart(4, '0');
};

// (async () => {
//   try {
//     const qrCodeDataURL = await generatePromptPayQRCode('0812345678', 100.00); // เบอร์โทรและจำนวนเงิน
//     console.log(qrCodeDataURL); // สามารถใช้เป็น src ของ <img>
//   } catch (error) {
//     console.error('Error generating QR Code:', error);
//   }
// })();
