import sys
try:
    import PyPDF2
    with open('CV.pdf', 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        print(text)
except ImportError:
    print("PyPDF2 not installed. Trying to install...")
    import subprocess
    subprocess.call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    print("Please run the script again after installation.")