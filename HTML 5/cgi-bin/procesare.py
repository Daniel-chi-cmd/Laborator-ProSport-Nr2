import cgi
import cgitb

cgitb.enable()

form = cgi.FieldStorage()
nume = form.getvalue('nume', 'Anonim')
email = form.getvalue('email', 'Nespecificat')
subiect = form.getvalue('subiect', 'Fără subiect')
mesaj = form.getvalue('mesaj', 'Fără conținut')

try:
    with open("mesaje_primite.txt", "a", encoding="utf-8") as f:
        f.write(f"Nume: {nume} | Email: {email}\nSubiect: {subiect}\nMesaj: {mesaj}\n")
        f.write("-" * 30 + "\n")
    
    print("Content-Type: text/plain; charset=utf-8\n")
    print("Succes: Datele au fost salvate.")
except Exception as e:
    print("Status: 500 Internal Server Error")
    print("Content-Type: text/plain; charset=utf-8\n")
    print(f"Eroare: {str(e)}")