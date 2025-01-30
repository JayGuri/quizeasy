"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFPreviewProps {
  file: File
}

export function PDFPreview({ file }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>PDF Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
          <Page pageNumber={pageNumber} width={300} />
        </Document>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => setPageNumber((page) => Math.max(page - 1, 1))} disabled={pageNumber <= 1}>
            Previous
          </Button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Button
            onClick={() => setPageNumber((page) => Math.min(page + 1, numPages))}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

