import React from 'react';
import { Alert } from 'react-bootstrap';

export default function GenericAlert({ type, text }) {
  return (
    <Alert key={type} variant={type}>
      {text}
    </Alert>
  );
}
