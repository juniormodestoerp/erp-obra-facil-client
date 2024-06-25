import realBRL from '@/assets/icons/currency/real-brl.svg';
import dolarUSD from '@/assets/icons/currency/dolar-usd.svg';
import euroEUR from '@/assets/icons/currency/euro-eur.svg';
import libraGBP from '@/assets/icons/currency/libra-gbp.svg';
import bahtTHB from '@/assets/icons/currency/baht-thb.svg';
import bolivianoBOB from '@/assets/icons/currency/boliviano-bob.svg';
import coroaSEK from '@/assets/icons/currency/coroa-sek.svg';
import coroaCZK from '@/assets/icons/currency/coroa-czk.svg';
import dirhamAED from '@/assets/icons/currency/dirham-aed.svg';
import dolarAUD from '@/assets/icons/currency/dolar-aud.svg'; // aq
import dolarCAD from '@/assets/icons/currency/dolar-cad.svg';
import dolarHKD from '@/assets/icons/currency/dolar-hkd.svg';
import dolarNZD from '@/assets/icons/currency/dolar-nzd.svg';
import dolarSGD from '@/assets/icons/currency/dolar-sgd.svg';
import dongVND from '@/assets/icons/currency/dong-vnd.svg';
import florimHUF from '@/assets/icons/currency/florim-huf.svg';
import francoCHF from '@/assets/icons/currency/franco-chf.svg';
import guaraniPYG from '@/assets/icons/currency/guarani-pyg.svg';
import ieneJPY from '@/assets/icons/currency/iene-jpy.svg';
import kunaHRK from '@/assets/icons/currency/kuna-hrk.svg';
import kwanzaAOA from '@/assets/icons/currency/kwanza-aoa.svg';
import lekALL from '@/assets/icons/currency/lek-all.svg';
import lempiraHNL from '@/assets/icons/currency/lempira-hnl.svg';
import meticalMZN from '@/assets/icons/currency/metical-mzn.svg';
import pesoARS from '@/assets/icons/currency/peso-ars.svg';
import pesoCLP from '@/assets/icons/currency/peso-clp.svg';
import pesoPHP from '@/assets/icons/currency/peso-php.svg';
import pesoMXN from '@/assets/icons/currency/peso-mxn.svg';
import pesoUYU from '@/assets/icons/currency/peso-uyu.svg';
import ringgitMYR from '@/assets/icons/currency/ringgit-myr.svg';
import rupiaIDR from '@/assets/icons/currency/rupia-idr.svg';
import yuanCNY from '@/assets/icons/currency/yuan-cny.svg';

interface IData {
  field: string;
  value: string;
  imageUrl: string;
}

export const currencyData: IData[] = [
  {
    field: 'Real (R$)',
    value: 'BRL',
    imageUrl: realBRL
  },
  {
    field: 'Dólar (US$)',
    value: 'USD',
    imageUrl: dolarUSD
  },
  {
    field: 'Euro (€)',
    value: 'EUR',
    imageUrl: euroEUR
  },
  {
    field: 'Libra Esterlina (£)',
    value: 'GBP',
    imageUrl: libraGBP
  },
  {
    field: 'Baht Tailandês (฿)',
    value: 'THB',
    imageUrl: bahtTHB
  },
  {
    field: 'Boliviano (Bs)',
    value: 'BOB',
    imageUrl: bolivianoBOB
  },
  {
    field: 'Coroa Sueca (kr)',
    value: 'SEK',
    imageUrl: coroaSEK
  },
  {
    field: 'Coroa Tcheca (Kč)',
    value: 'CZK',
    imageUrl: coroaCZK
  },
  {
    field: 'Dirham EAU (DH)',
    value: 'AED',
    imageUrl: dirhamAED
  },
  {
    field: 'Dólar Australiano (A$)',
    value: 'AUD',
    imageUrl: dolarAUD
  },
  {
    field: 'Dólar Canadense (C$)',
    value: 'CAD',
    imageUrl: dolarCAD
  },
  {
    field: 'Dólar de Hong Kong (HK$)',
    value: 'HKD',
    imageUrl: dolarHKD
  },
  {
    field: 'Dólar Neozelandês (NZ$)',
    value: 'NZD',
    imageUrl: dolarNZD
  },
  {
    field: 'Dólar Singapuriano (S$)',
    value: 'SGD',
    imageUrl: dolarSGD
  },
  {
    field: 'Dong Vietnamita (₫)',
    value: 'VND',
    imageUrl: dongVND
  },
  {
    field: 'Florim Húngaro (Ft)',
    value: 'HUF',
    imageUrl: florimHUF
  },
  {
    field: 'Franco Suíço (Fr)',
    value: 'CHF',
    imageUrl: francoCHF
  },
  {
    field: 'Guarani Paraguaio (Gs)',
    value: 'PYG',
    imageUrl: guaraniPYG
  },
  {
    field: 'Iene (¥)',
    value: 'JPY',
    imageUrl: ieneJPY
  },
  {
    field: 'Kuna Croata (Kn)',
    value: 'HRK',
    imageUrl: kunaHRK
  },
  {
    field: 'Kwanza Angolano (Kz)',
    value: 'AOA',
    imageUrl: kwanzaAOA
  },
  {
    field: 'Lek Albanês (L)',
    value: 'ALL',
    imageUrl: lekALL
  },
  {
    field: 'Lempira Hondurenha (L)',
    value: 'HNL',
    imageUrl: lempiraHNL
  },
  {
    field: 'Metical Moçambicano (MT)',
    value: 'MZN',
    imageUrl: meticalMZN
  },
  {
    field: 'Peso Argentino ($)',
    value: 'ARS',
    imageUrl: pesoARS
  },
  {
    field: 'Peso Chileno ($)',
    value: 'CLP',
    imageUrl: pesoCLP
  },
  {
    field: 'Peso Filipino (₱)',
    value: 'PHP',
    imageUrl: pesoPHP
  },
  {
    field: 'Peso Mexicano ($)',
    value: 'MXN',
    imageUrl: pesoMXN
  },
  {
    field: 'Peso Uruguaio ($U)',
    value: 'UYU',
    imageUrl: pesoUYU
  },
  {
    field: 'Ringgit Malaio (RM)',
    value: 'MYR',
    imageUrl: ringgitMYR
  },
  {
    field: 'Rúpia Indonésia (Rp)',
    value: 'IDR',
    imageUrl: rupiaIDR
  },
  {
    field: 'Yuan (¥)',
    value: 'CNY',
    imageUrl: yuanCNY
  }
];
