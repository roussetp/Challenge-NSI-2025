// variables globales :

resultat_attendu=0;
resultat_propose=0;
nb_calculs_faits=0;
niveau=0;
score_en_cours=0;
score_joueur_max=0;
score_a_battre=0;
nb_bonnes_reponses=0;
parole = new SpeechSynthesisUtterance();// déclaration synthèse vocale
parole.pitch=1; // de 0 à 2 hauteur
parole.rate= 1; // de 0,5 à 2 vitesse
parole.volume=1; // de 0 à 1 volume

temps_restant=60;//durée d'une partie de 60s
termine=true;// variable indiquant si une partie est terminé 
pseudoEnCours="";
numero=0;
numeroClassement=0;


function niveau1 ()// Calcul arithmétique (+ - / *)
{
    // Calcul mental avec les 4 opérations.
    choix="";
    choix = prompt("Saisir");
    z="ttt";
    alert(choix);
    let parole = new SpeechSynthesisUtterance();
    if (nb_calculs_faits==0)//première calcul de la partie?
    {
        document.getElementById('n1').disabled = true;//blocage des 3 boutons de choix
        document.getElementById('n2').disabled = true;//type de calcul
        document.getElementById('n3').disabled = true;
        refreshIntervalId = setInterval(function(){decompte();},1000);//comptage seconde
        document.getElementById("tempsRestant").innerHTML="Temps restant : ";
        document.getElementById('n4').style.visibility="visible";
        document.getElementById('resultat_propose').style.visibility="visible";
        document.getElementById('message').style.visibility="visible";
        document.getElementById("par5").innerHTML="";
        document.getElementById("par6").innerHTML="";
    }

    document.getElementById("par5").innerHTML=" ";// Effacement message
	niveau=1;// mémorisation du niveau en cours
    volume();// lecture niveau sonore souhaité
    
	var min=2; 
	var max=16;
    var signe="+";
    var operation=1;
    //var resultat_attendu=0;
    var temp=0;
     
     // Génération des valeurs aléatoires nb1 ;nb2 ; quot et de l'opérateur 
    var nb1=Math.floor(Math.random() * (+max - +min)) + +min;
	var nb2=Math.floor(Math.random() * (+max - +min)) + +min;
    var quot=Math.floor(Math.random() * (+max - +min)) + +min;
	var ope=Math.floor(Math.random()*4)+1;
     
	//Génération des opérations et calcul du résultat entendu;
 
    if (ope==1) {signe="+";resultat_attendu=nb1+nb2;parole.text =+nb1+" plus "+nb2;speechSynthesis.speak(parole);}
    if (ope==2) {signe="-"; 
                 if (nb1<nb2) {temp=nb1; nb1=nb2; nb2=temp;} resultat_attendu=nb1-nb2 ;parole.text =+nb1+" moins "+nb2;speechSynthesis.speak(parole);}

    if (ope==3) {signe="x" ;resultat_attendu=nb1*nb2;parole.text =+nb1+" multiplié par "+nb2;speechSynthesis.speak(parole);} 
    if (ope==4) {signe="÷" ;nb1=nb2*quot; resultat_attendu=quot;parole.text =+nb1+" divisé par "+nb2;speechSynthesis.speak(parole);}  
    
    // Affichage du calcul à effectuer.
	document.getElementById("par3").innerHTML =+nb1+" "+signe+" "+nb2;
	
	//speechSynthesis.speak(parole);
}
 	
function niveau2()// Calcul mental avec les booléens
{
    // Initialisation des variables
    let parole = new SpeechSynthesisUtterance();
    if (nb_calculs_faits==0)
    {
        document.getElementById('n1').disabled = true;
        document.getElementById('n2').disabled = true;
        document.getElementById('n3').disabled = true;
        refreshIntervalId = setInterval(function(){decompte();},1000);
        document.getElementById("tempsRestant").innerHTML="Temps restant : ";
        document.getElementById('n4').style.visibility="visible";
        document.getElementById('resultat_propose').style.visibility="visible";
        document.getElementById('message').style.visibility="visible";
        document.getElementById("par5").innerHTML="";
        document.getElementById("par6").innerHTML="";
    }
    
    niveau=2;// mémorisation du niveau en cours
    volume();// lecture niveau sonore souhaité
    document.getElementById("par5").innerHTML=" ";// Effacement message

    var operateur1=" et ";
    var operateur2=" ou ";
    var nb1=1;
    var nb2=1;
    var nb3=1;
    //var resultat_attendu=1;
    
    // Génaration des valeurs booléennes nb1 ;nb2 ; nb3 et des opérateurs ope1 et ope2
	nb1=Math.floor(Math.random()*2);
	nb2=Math.floor(Math.random()*2);
    nb3=Math.floor(Math.random()*2);
	var ope1=Math.floor(Math.random()*2);
    var ope2=Math.floor(Math.random()*2);
     
	//Génération des opérations et calcul du résultat entendu;
 
    if (ope1==1) {operateur1=" et ";resultat_attendu=nb1*nb2;}
    if (ope1==0) {operateur1=" ou ";resultat_attendu=nb1+nb2-nb1*nb2;}
    if (ope2==1) {operateur2=" et ";resultat_attendu=resultat_attendu*nb3;} 
    if (ope2==0) {operateur2=" ou ";resultat_attendu=resultat_attendu+nb3-resultat_attendu*nb3;}  
     
    // Affichage du calcul à effectuer.
	document.getElementById("par3").innerHTML="("+nb1+operateur1+nb2+")"+operateur2+nb3;
	parole.text ="("+nb1+operateur1+nb2+")"+operateur2+nb3;
	speechSynthesis.speak(parole);			
}

function niveau3()// Calcul mental pour convertir d'une base vers une autre
{
    // Initialisation des variables
    let parole = new SpeechSynthesisUtterance();
    if (nb_calculs_faits==0)
    {       
        document.getElementById("tempsRestant").innerHTML="Temps restant : ";
        document.getElementById('n1').disabled = true;
        document.getElementById('n2').disabled = true;
        document.getElementById('n3').disabled = true;
        refreshIntervalId = setInterval(function(){decompte();},1000);
        document.getElementById('n4').style.visibility="visible";
        document.getElementById('resultat_propose').style.visibility="visible";
        document.getElementById('message').style.visibility="visible";
        document.getElementById("par5").innerHTML="";
        document.getElementById("par6").innerHTML="";
    }

    niveau=3;// mémorisation du niveau en cours
    volume();// lecture niveau sonore souhaité
    document.getElementById("par5").innerHTML=" ";// Effacement message

    let conv=Math.floor(Math.random()*6)+1;
    let nb_decimal;let nb_binaire;let nb_hexadecimal;let nb_afficher;
    
    if (conv==1) //Décimal en Hexadécimal
    {
    	nb_decimal=Math.floor(Math.random()*32)+8;
    	document.getElementById("par3").innerHTML ="Convertir "+nb_decimal+" de décimal en hexadécimal";
    	parole.text ="Convertir "+nb_decimal+" de décimal en hexadécimal";
		speechSynthesis.speak(parole);
    	resultat_attendu=nb_decimal.toString(16);// Conversion Hexa
    }
    if (conv==2) //Décimal en Binaire
    {
    	nb_decimal=Math.floor(Math.random()*32)+8;
    	document.getElementById("par3").innerHTML ="Convertir "+nb_decimal+" de décimal en binaire";
    	parole.text ="Convertir "+nb_decimal+" de décimal en binaire";
		speechSynthesis.speak(parole);
    	resultat_attendu=nb_decimal.toString(2);// Conversion binaire
    }
    if (conv==3) //Binaire en Décimal
    {
    	resultat_attendu=Math.floor(Math.random()*32)+8;
    	nb_binaire=resultat_attendu.toString(2);
    	document.getElementById("par3").innerHTML ="Convertir "+nb_binaire+" de binaire en décimal";
    	parole.text ="Convertir "+nb_binaire+" de binaire en décimal";
		speechSynthesis.speak(parole);    	
    }
    if (conv==4) //Binaire en Hexadécimal
    {
    	nb_decimal=Math.floor(Math.random()*32)+8;
    	nb_binaire=nb_decimal.toString(2);
    	resultat_attendu=nb_decimal.toString(16);
    	document.getElementById("par3").innerHTML ="Convertir "+nb_binaire+" de binaire en hexadécimal";
    	parole.text ="Convertir "+nb_binaire+" de binaire en hexadécimal";
		speechSynthesis.speak(parole);    	
    }
    if (conv==5) //Hexadécimal en Binaire
    {
    	nb_decimal=Math.floor(Math.random()*32)+8;
    	resultat_attendu=nb_decimal.toString(2);
    	nb_hexadecimal=nb_decimal.toString(16);
    	nb_afficher=nb_hexadecimal.toString();
    	nb_afficher=nb_afficher.toUpperCase();
    	document.getElementById("par3").innerHTML ="Convertir "+nb_afficher+" d'hexadécimal en binaire";
    	parole.text ="Convertir "+nb_hexadecimal+" d'hexadécimal en binaire";
		speechSynthesis.speak(parole);    	
    }
    if (conv==6) //Hexadécimal en Décimal
    {
    	nb_decimal=Math.floor(Math.random()*32)+8;
    	resultat_attendu=nb_decimal;
    	nb_hexadecimal=nb_decimal.toString(16);
    	nb_afficher=nb_hexadecimal.toString();
    	nb_afficher=nb_afficher.toUpperCase();
    	document.getElementById("par3").innerHTML ="Convertir "+nb_afficher+" d'hexadécimal en décimal";
    	parole.text ="Convertir "+nb_hexadecimal+" d'hexadécimal en décimal";
		speechSynthesis.speak(parole);    	
    }		
}

function verification()//vérification de la justesse de la proposition
{
    let parole = new SpeechSynthesisUtterance();// init synthèse vocale
    resultat_propose = document.getElementById("resultat_propose").value;// récupération de la valeur saisie
    resultat_propose=resultat_propose.toLowerCase();// mettre en minuscule
    if (resultat_propose==resultat_attendu)// c'est bon ?
    {
        document.getElementById("par5").innerHTML="C'est bon !";
        parole.text = "Bravo";
        speechSynthesis.speak(parole);
        nb_bonnes_reponses+=1
    } else// ce n'est pas bon...
    {
        nb_afficher=resultat_attendu.toString();//résultat à afficher
        document.getElementById("par5").innerHTML="Ce n'est pas bon! La réponse est : "+nb_afficher.toUpperCase();
        parole.text = "Pas de chance, la bonne réponse est"+resultat_attendu;
        speechSynthesis.speak(parole);
    }
    nb_calculs_faits+=1;//comptage nombre de calculs faits
    document.getElementById("par7").innerHTML="Nombre de bonnes réponses : "+nb_bonnes_reponses;
    document.getElementById("resultat_propose").value = " ";//efface le message
    if (nb_calculs_faits<100)//prévision mode de fonctionnement avec temps ilimmité
    {
    	switch (niveau)// suivant le niveau de calcul engagé...
    	{
    		case 1:setTimeout(niveau1,1900);break;//...on relance le calcul après 1,9s
    		case 2:setTimeout(niveau2,1900);break;
    		case 3:setTimeout(niveau3,1900);break;
    	}   	
    }else
    {    	
    	setTimeout(affichageScore, 3000);// affichage du score 3 secondes plus tard
    	nb_calculs_faits=0;
    	niveau=0;
    }
}

// Mémoire DOM
if (localStorage.length==0)// Intialisation DOM Storage
{
	for (var i=1; i<12;i++)// création d'une liste de 11 objets JSON
    {
        var numero='num'+i;
        numero={pseudo: ' ',score: 0};// objet JSON constitué du speudo et de son score
        localStorage.setItem('num'+i, JSON.stringify(numero));// création d'une clé 'num'i dans le DOM avec pour valeur l'objet JSON 
    }
	var declasse ={pseudo: ' ',score: 0};// objet JSON supplémentaire
}


function affichageScore()// Affichage du score
{
	let parole = new SpeechSynthesisUtterance();// initialisation synthèse vocale
    nb_calculs_faits=0;// initialisation nombre de calculs faits

	document.getElementById("par3").innerHTML=" "; // efface le dernier calcul
    document.getElementById("par7").innerHTML=" "; // efface le nombre de bonnes réponses
    document.getElementById("tempsRestant").innerHTML=" ";// efface le temps restant
    document.getElementById('resultat_propose').style.visibility="hidden";
    document.getElementById('message').style.visibility="hidden";    

	document.getElementById("par5").innerHTML="Terminé !!!";// affiche le message "Terminé""
    parole.text = "c'est terminé et ton score est de "+nb_bonnes_reponses+"points";// stocke le message vocal
    speechSynthesis.speak(parole);// lance la synthèse vocale

	if (nb_bonnes_reponses<=1)// si un seul point
    {
        document.getElementById("par6").innerHTML="Ton score : "+nb_bonnes_reponses+" point";// affiche sans s à point
    }
	else// si plusieurs points
    {
        document.getElementById("par6").innerHTML="Ton score : "+nb_bonnes_reponses+" points";// affiche avec s à point
    }

    score_en_cours=nb_bonnes_reponses;// le score est simplement le nombre de bonnes réponses
    if (score_en_cours>score_a_battre)// le score est battu?
    {
        let parole = new SpeechSynthesisUtterance();
        parole.text ="Bravo, Tu viens d'augmenter ton score";
        speechSynthesis.speak(parole);        
        score_a_battre=score_en_cours;// mémorise le nouveau score
        if ((pseudoEnCours!="")&&(score_en_cours>JSON.parse(localStorage.getItem('num10'))["score"]))//score plus important que celui du dixième
        {
            reclassement();
        }    
    }
    document.getElementById("tonScoreMax").innerHTML=pseudoEnCours+" voici ton meilleur score : "+score_a_battre;// affiche le nouveau score à battre

    document.getElementById('n4').style.visibility="hidden";//cacher différents div
    document.getElementById('resultat_propose').style.visibility="hidden";
    document.getElementById('message').style.visibility="hidden";
       
    document.getElementById('n1').disabled = false;// déblocages boutons choix type de calcul
    document.getElementById('n2').disabled = false;
    document.getElementById('n3').disabled = false;
    
    nb_bonnes_reponses=0;// réinitialisations
	score_en_cours=0;
    termine=true;
}

function decompte()// Décompte du temps secande par seconde
{
    temps_restant-=1;// décomptage du temps
    document.getElementById("tempsRestant").innerHTML="Temps restant : "+temps_restant;
    if (temps_restant<=0)//temps écoulé
    {
        document.getElementById('n4').style.visibility="hidden";//bouton de validation caché
        document.getElementById("tempsRestant").innerHTML="Temps restant : 0";
    }
    if (temps_restant<=-2)// 2 seconde après le 0s
    {
        clearInterval(refreshIntervalId);//arrêt comptage
        temps_restant=60;//réinitialisation du temps restant
        affichageScore();//affichage du score
    }
    if ((temps_restant>3) && (temps_restant<10))// changement de la couleur du texte en orange
    {
        document.getElementById("tempsRestant").style.color="orange";
    }
    if (temps_restant<=3)// changement de la couleur du texte en orange
    {
        document.getElementById("tempsRestant").style.color="red";
    }
    if (temps_restant>=10)// changement de la couleur du texte en orange
    {
        document.getElementById("tempsRestant").style.color="black";
    }
}

function volume()// Acquisition du volume sonore souhaité
{
    parole.volume=(document.getElementById("volumeSonore").value)/10;
}

function identif()// Affiche la page d'identification
{
    if (termine==true)// si c'est termminé...
    {
        document.getElementById('n1').disabled = true;//déblocage des trois boutons choix niveaux
        document.getElementById('n2').disabled = true;
        document.getElementById('n3').disabled = true;
        document.getElementById('page1').style.display="none";//cache les pages  1 et 2
        document.getElementById('page3').style.display="none";
        document.getElementById('page2').style.display="block";//affiche la paage 1 pour saisir le pseudo
        score_a_battre=0;
    }
}

function valideSpeudo()// Valide le pseudo et quitte la page
{
    pseudoEnCours = document.getElementById("pseudo").value;//récupère le pseudo
    document.getElementById("par6").innerHTML="";//efface le texte
    

    document.getElementById('page2').style.display="none";//cache la page 2
    document.getElementById('page1').style.display="block";//affiche la page 1 principale
    document.getElementById('n1').disabled = false;//débloque les 3 boutons des menus
    document.getElementById('n2').disabled = false;
    document.getElementById('n3').disabled = false;
    if (pseudoEnCours!="")// si le pseudo n'est pas nul...
    {
        document.getElementById("par5").innerHTML="Bienvenue !!!";//...affiche le message
        let parole = new SpeechSynthesisUtterance();// et parle
        parole.text ="Bienvenue et bon jeu";
        speechSynthesis.speak(parole);  
    }
}

function classement()// Affiche le tableau des classements
{
    if (termine==true)
    {            
        document.getElementById('n1').disabled = true;//bloque  les 3 boutons des choix
        document.getElementById('n2').disabled = true;
        document.getElementById('n3').disabled = true;
        document.getElementById('page1').style.display="none";//effacement page 1 et 2
        document.getElementById('page2').style.display="none";
        document.getElementById('page3').style.display="block";//affichage page 3
        for (var i=1; i<11;i++)//remplissage du tableau
        {
            document.getElementById('pseudo'+i).innerHTML=JSON.parse(localStorage.getItem('num'+i))["pseudo"];//récupère chaque pseudo et l'affiche
            document.getElementById('score'+i).innerHTML=JSON.parse(localStorage.getItem('num'+i))["score"];//récupère chaque score et l'affiche
        }
    }
}

function retour()// Quitte le tableau des classements
{
    document.getElementById('page2').style.display="none";
    document.getElementById('page3').style.display="none";
    document.getElementById('page1').style.display="block";//affiche la page 1
    document.getElementById('n1').disabled = false;
    document.getElementById('n2').disabled = false;
    document.getElementById('n3').disabled = false;
}

function reclassement()//reclassement dans le tableau en cas d'un meilleur score
{
	for (var i =localStorage.length ; i >0; i--)//recherche numéro classement du pseudo en cours
	{
		if (JSON.parse(localStorage.getItem('num'+i))["pseudo"]==pseudoEnCours)
		{
			var numeroPseudoEnCours=i;
			break;
		}else{
			var numeroPseudoEnCours=11;
		}
	}
    for (var i =1 ; i <=localStorage.length; i++)// Recherche du nouveau numéro de classement
    {
        if (score_en_cours>JSON.parse(localStorage.getItem('num'+i))["score"])// Score effectivement supérieur
        {
            numeroClassement=i;
            break;
        }
    }
    if (numeroPseudoEnCours==numeroClassement)// Augmentation simple du score
    {
        localStorage.setItem('num'+numeroClassement, JSON.stringify({pseudo: pseudoEnCours,score: score_en_cours}));
    }else
    {
        for (var i =numeroPseudoEnCours ; i >numeroClassement; i--)// Reclasse en déclassant les pseudos avec score moins élevés
        {
            var j=i-1;
            declasse=JSON.parse(localStorage.getItem('num'+j));
            localStorage.setItem('num'+i, JSON.stringify(declasse));// Déclasse
            localStorage.setItem('num'+j, JSON.stringify({pseudo: pseudoEnCours,score: score_en_cours}));// Reclasse
        }
        let parole = new SpeechSynthesisUtterance();
        parole.text ="Bravo ! Tu es monté dans le classement";
        speechSynthesis.speak(parole);  
        alert("Bravo ! Tu es monté dans le classement");
    }	
}