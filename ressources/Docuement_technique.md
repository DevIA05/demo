---
title: Document Technique
date: 21/10/2022
author: Idriss Kourbanhoussen (05)
---

# Context

Une entreprise spécialisée dans la conception de jouets, et notamment de petits robots souhaite réaliser une POC (Proof Of Concept), sur une base web simple (navigateur + webcam), de détection et reconnaissance d’objet.

# Projet

Le projet permettra à partir d'une webcam d'identifier les signes (la gestuelle) issues de *ASL Alphabet* (American Sign Language) dans un objectif d'apprentissage pour les enfants. 
Le dispositif sera mis sur une peluche. 

# Technologie employé

## p5<sub>*</sub>js
p5<sub>*</sub>js est une bibliothèque JavaScript. Cet considère la page de navigateur comme un croquis, y compris les objets HTML5 pour le texte, la saisie, la vidéo, la webcam et le son.

## ml5.js 
ml5.js est l'apprentissage automatique pour le Web dans votre navigateur Web. Il est construit sur TensorFlow.js et utilise ces fonctionnalités au niveau du backend.



## bash
J'ai utilisé la commande ci-dessous me permettant d'obtenir à partir du model (.h5) sauvegarder sous *keras*, le modèle exploitable en *ml5.js*
```bash
tensorflowjs_converter --input_format keras \
                       model/model.h5 \
                       modelJS/
```
J'obtiens ainsi deux fichiers:
- model.json
- group1-shard1of1.bin

( La commande *tensorflowjs_converter* s'obtiens en installant *tensorflow.js* avec `pip install tensorflowjs` puis en indiquant lors de l'emploi de la commande le chemin du package *tensorflow* )


# Architecture du projet

L'arbre du projet se trouve dans le répertoire *ressources* 

## Modèle
Le répertoire modèle contient trois modèle de reconnaissance de signe dont seul le modèle model0 est utilisé et via un URL (et non pas importé depuis le répertoire model0).  

# Code

## sign_language.html
Le fichier *sign_language.html* contient tous les éléments qui seront affichés sur la page.
Il fait appel à :
- P5.js (à partir du CDN)
- ml5.js (à partir du CDN)
- css/sign_language.css 
- css/button.css (met en forme uniquement les boutons)
- js/sign-language.js 

## sign-language.js

Le fichier *sign-language.js* sert à activer la webcam et à faire appel au modèle d'IA permettant la reconnaissance des signes 

### Variables globaux

- tauxR (int): Tau de rafraichissement.   
- imageModelURL (str): Url du modèle hébergé sur teachablemachine.withgoogle.com.
- vidéo: Elément HTML5 <video> qui contient le flux audio/vidéo d'une webcam.
- flippedVideo: Image retourné.
- classifier: Modèle.
- res: Résultats de la prédiction.
- label (str): Nom du signe prédit.
- alphabet (list): Lettre de l'alphabet
- signe (str): Lettre (signe) a effectuer désigné par le programme 1 ou 2
- start (bool): Permet de lancer dans la fonction `SignIsCorrect()` dans la fonction `draw()`
- index (int): Permet de parcourir l'alphabet
- fin (int): Indique à quel index doit s'arrêter le parcours;  
- tagSign: point vers l'élément html qui permet d'afficher le signe a effectué

### preload()
La fonction [preload()](https://p5js.org/reference/#/p5/preload) (l34) est utilisée pour gérer le chargement asynchrone de fichiers externes de manière bloquante. Si une fonction de préchargement est définie, *setup()* attendra que tous les appels de chargement soient terminés. 

On charge le modèle de machine learning (l35) qui permettra d'analyser les images et d'en retirer une prédiction.

### setup() 
La fonction [setup()](https://p5js.org/reference/#/p5/setup) (l39) est appelée une fois au démarrage du programme. Il est utilisé pour définir les propriétés initiales de l'environnement.

Je fixe la fréquence d'images (avec la fonction `frameRate`) à 0.8 (l40) pour ne pas surcharger le CPU. 
Je mets en place un cadre où sera mis en place la caméra (l40-48).  
La fonction [ml5.flipImage()](https://learn.ml5js.org/#/reference/utils?id=usage) (l49) pour retourner l'entrée vidéo horizontalement et renvoie l'image retournée. Ce qui permettra au modèle de mieux prédire le signe.

### draw()
 La fonction [draw()](https://p5js.org/reference/#/p5/draw) (l55) est appelée directement après `setup()`, la fonction `draw()` exécute en continu les lignes de code contenues dans son bloc jusqu'à l'arrêt du programme 

 J'appelle le modèle avec la fonction `classifyVideo()` pour prédire le signe capter par la caméra (l66). Puis je teste si le signe est correcte ou non (l67-69) avec la fonction `SignIsCorrect()`

 ### classifyVideo() 
 La fonction (l73) permet de prédire l'image capturé par la caméra.

 ### gotResult()
 Assigne le resultat obtenu par le modèle effectué par la fonction `classifyVideo()` aux variables globaux.

### say()
Permet d'utiliser la synthèse vocale (l95)

### programme 1, 2()
Lance une séquence de signe qui doivent être appris (l107-118).

### doSign()
Affecte aux variables globaux et dans le rendu web le signe qui doit être fait (l120).

### SignIsCorrect()
Teste si le signe capturé par la caméra est correcte, s'il est passe au signe suivant.

### launchTP()
Permet de lancer le programme correspondant au bouton appuyé.



# Ressources

Le modèle pré-entrainé est obtenu à partir du travaille de [Naman Manchanda](https://www.kaggle.com/code/namanmanchanda/asl-detection-99-accuracy/notebook).

Les données qui ont permis d'avoir ce modèle proviennent du projet [ASL Alphabet](https://www.kaggle.com/datasets/grassknoted/asl-alphabet) d'[Akash Nagaraj ](https://github.com/grassknoted)

[Documentation de ML5.js](https://learn.ml5js.org/#/)

[Documentation de P5.js](https://p5js.org/)

https://www.freepik.com/author/catalyststuff