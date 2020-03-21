import React from 'react';
import QRScanner from '../../QRScanner/QRScanner';

export default function({ setData }) {
  return <div><QRScanner setData={setData} /></div>
}