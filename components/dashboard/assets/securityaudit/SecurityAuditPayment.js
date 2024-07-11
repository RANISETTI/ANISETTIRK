import { faCheck, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Editor } from '@tinymce/tinymce-react/';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useRef, useState } from 'react';
import {
  Alert, Button, Card, Col, Form,
} from 'react-bootstrap';

export default function SecurityAuditPayment({ requestPayment }) {
  const router = useRouter();
  const editorRef = useRef(null);
  const [description, setDescription] = useState();
  const [amount, setAmount] = useState();
  const [jobErrors, setJobErrors] = useState();
  console.log(requestPayment);
  return (
    <>
      <Script src="/tinymce/js/tinymce/tinymce.min.js" strategy="beforeInteractive" />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div>
            <Button className="float-end" onClick={() => router.push(requestPayment ? '/dashboard/assets/security-audit/' : '/dashboard/assets/software')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back
            </Button>
            <h3 className="your-cart">
              {requestPayment ? 'Request for Payment' : 'Payment Details'}
              {' '}
            </h3>
          </div>
        </Card.Header>
        {requestPayment ? (
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <br />
              <Editor
                tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
                onInit={(evt, editor) => { editorRef.current = editor; }}
                init={{
                  height: 300,
                  menubar: false,
                  browser_spellcheck: true,
                  paste_as_text: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
                  ],
                  toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter '
                    + 'alignright alignjustify | bullist numlist outdent indent | '
                    + 'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={(e) => {
                  setDescription(e);
                  setJobErrors({ ...jobErrors, description: '' });
                }}
                value={description}
                outputFormat="html"
              />
              {/* {jobErrors.description ? (
              <Alert variant="danger">
                {jobErrors.description}
              </Alert>
            ) : ''} */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="amount"
                id="amount"
                name="amount"
                autoComplete="off"
                placeholder="Enter amount"
                onChange={(e) => setAmount(e.target.value)}
                  // isInvalid={!!(emailErrors && emailErrors.length && emailErrors)}
                required
              />
            </Form.Group>
          </Card.Body>
        ) : (
          <Card.Body>
            <Form.Group as={Col} xs={12} md={6} className="mb-2 mt-2">
              <Form.Label>Descrption :</Form.Label>
              {' '}
            </Form.Group>
            <Form.Group as={Col} xs={12} md={6} className="mb-2">
              <Form.Label>Amount :</Form.Label>
              {' '}
            </Form.Group>
          </Card.Body>
        )}

        {requestPayment && (
        <div className="pagenation-style p-3">
          <Button className="me-2  px-3" onClick={() => router.push('/dashboard/vendor-empanelment/vendorlist/')} variant="danger">
            <FontAwesomeIcon icon={faTimes} />
            {' '}
            Cancel
          </Button>
          <Button variant="success" className="btn btn-success  px-3" onClick={() => onSubmit()}>
            <FontAwesomeIcon icon={faCheck} />
            {' '}
            {requestPayment ? 'Submit' : 'Paynow'}
          </Button>
        </div>
        )}
      </Card>
    </>
  );
}
