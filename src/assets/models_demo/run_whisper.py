import socket
import whisper
import os

# Configuration du serveur socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('localhost', 9999))
server.listen(1)

# Charger le modèle Whisper une fois pour réutilisation
model = whisper.load_model("small.pt")

punctuations = '!?\":,/.;()[]'
punc_table = str.maketrans({key: None for key in punctuations})

def process_pred(pred):
    """Nettoyer la prédiction du modèle."""
    ref = pred.replace('- ', ' ').replace(' -', ' ')
    ref = str(ref).translate(punc_table)  # Enlever la ponctuation
    process = ref.lower()  # Mettre en minuscule
    return process.strip()  # Enlever les espaces inutiles

def handle_client(connection):
    # Réception du fichier audio
    audio_data = connection.recv(4096)

    # Sauvegarder le fichier temporairement
    audio_path = "temp_audio.wav"
    with open(audio_path, "wb") as audio_file:
        audio_file.write(audio_data)

    try:
        # Transcrire l'audio avec Whisper
        pred = model.transcribe(audio_path, language='fr')["text"]
        cleaned_pred = process_pred(pred)
        connection.sendall(cleaned_pred.encode('utf-8'))
    except Exception as e:
        connection.sendall(str(e).encode('utf-8'))
    finally:
        # Supprimer le fichier temporaire
        if os.path.exists(audio_path):
            os.remove(audio_path)
        connection.close()

print("Serveur Whisper en écoute sur le port 9999...")
while True:
    conn, addr = server.accept()
    print(f"Connexion de {addr}")
    handle_client(conn)
