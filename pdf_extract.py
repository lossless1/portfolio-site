import sys
import subprocess
import os

# Try different PDF extraction methods
def extract_pdf_text():
    # Method 1: Try pdfplumber first
    try:
        import pdfplumber
        with pdfplumber.open('CV.pdf') as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
            return text
    except ImportError:
        pass
    
    # Method 2: Try PyPDF2
    try:
        import PyPDF2
        with open('CV.pdf', 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text
    except ImportError:
        pass
    
    # Method 3: Try using system pdftotext command
    try:
        result = subprocess.run(['pdftotext', 'CV.pdf', '-'], 
                              capture_output=True, text=True, check=True)
        return result.stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    # Method 4: Try strings command as fallback
    try:
        result = subprocess.run(['strings', 'CV.pdf'], 
                              capture_output=True, text=True, check=True)
        return result.stdout
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass
    
    return "Could not extract text from PDF using available methods"

if __name__ == "__main__":
    text = extract_pdf_text()
    print(text)