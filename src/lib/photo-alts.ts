/**
 * Texto alternativo (alt) DESCRIPTIVO por foto, en los 3 idiomas.
 * Clave: "<carpeta>/<nombre de archivo sin extensión>" (src/assets/photos).
 * Lo usa photoAlt() en src/lib/photos.ts. Una foto sin entrada aquí
 * recibe el alt genérico ("Bodas — Satori Arts, foto N").
 *
 * Al añadir una foto nueva: nómbrala "NN-descripcion-corta.webp" (el NN
 * mantiene el orden) y añade aquí su línea con lo que se VE en la foto.
 */
import type { Locale } from "@/config";

export const PHOTO_ALT: Record<string, Record<Locale, string>> = {
  "bodas/01-silueta-novios-atardecer-ventanal": { es: "Silueta de los novios besándose frente a un gran ventanal al atardecer", en: "Silhouette of the couple kissing in front of a large window at sunset", ca: "Silueta dels nuvis fent-se un petó davant d'un gran finestral al capvespre" },
  "bodas/02-anillos-boda-novios-playa": { es: "Anillos de boda en primer plano con los novios en la playa al fondo", en: "Wedding rings in the foreground with the couple on the beach behind", ca: "Anells de casament en primer pla amb els nuvis a la platja al fons" },
  "bodas/03-novios-puerta-madera-masia": { es: "Novios junto a una puerta de madera en el interior de una masía", en: "Bride and groom by a wooden door inside a country house", ca: "Nuvis al costat d'una porta de fusta a l'interior d'una masia" },
  "bodas/04-novia-preparativos-zapatos": { es: "Novia poniéndose los zapatos durante los preparativos", en: "Bride putting on her shoes while getting ready", ca: "Núvia posant-se les sabates durant els preparatius" },
  "bodas/05-detalle-ramo-novia": { es: "Detalle del ramo de novia con flores naranjas y eucalipto", en: "Detail of the bridal bouquet with orange flowers and eucalyptus", ca: "Detall del ram de núvia amb flors taronges i eucaliptus" },
  "bodas/06-novios-balcon-buganvilla": { es: "Novios en un balcón con buganvillas", en: "Couple on a balcony covered in bougainvillea", ca: "Nuvis en un balcó amb buguenvíl·lees" },
  "bodas/07-preparativos-vestido-novia": { es: "Damas de honor ajustando el vestido de la novia", en: "Bridesmaids adjusting the bride's dress", ca: "Dames d'honor ajustant el vestit de la núvia" },
  "bodas/08-novios-playa-bloques-hielo": { es: "Novios caminando entre bloques de hielo en una playa de arena negra", en: "Couple walking among blocks of ice on a black sand beach", ca: "Nuvis caminant entre blocs de gel en una platja de sorra negra" },
  "bodas/09-dos-novias-celebracion-invitados": { es: "Dos novias celebrando con los invitados tras la ceremonia", en: "Two brides celebrating with their guests after the ceremony", ca: "Dues núvies celebrant amb els convidats després de la cerimònia" },
  "bodas/10-vestido-novia-ventana-fachada": { es: "Vestido de novia colgado en la ventana de una fachada blanca", en: "Wedding dress hanging in the window of a white façade", ca: "Vestit de núvia penjat a la finestra d'una façana blanca" },
  "bodas/11-novios-campo-velo-largo": { es: "Novios en un campo verde con un velo largo", en: "Couple in a green field with a long veil", ca: "Nuvis en un camp verd amb un vel llarg" },
  "bodas/12-beso-novios-rocas-mar": { es: "Beso de los novios sobre las rocas junto al mar", en: "The couple kissing on the rocks by the sea", ca: "Petó dels nuvis sobre les roques vora el mar" },
  "bodas/13-novia-velo-blanco-negro": { es: "Retrato en blanco y negro de la novia con el velo al viento", en: "Black and white portrait of the bride with her veil in the wind", ca: "Retrat en blanc i negre de la núvia amb el vel al vent" },
  "bodas/14-manos-anillos-ramo-blanco": { es: "Manos de los novios con los anillos sobre un ramo blanco", en: "The couple's hands with their rings on a white bouquet", ca: "Mans dels nuvis amb els anells sobre un ram blanc" },
  "bodas/15-novios-arcos-patio-masia": { es: "Novios bajo los arcos del patio de una masía", en: "Couple under the arches of a country house courtyard", ca: "Nuvis sota els arcs del pati d'una masia" },
  "bodas/16-novia-ventana-atardecer": { es: "Novia junto a la ventana al atardecer antes de la boda", en: "Bride by the window at sunset before the wedding", ca: "Núvia al costat de la finestra al capvespre abans del casament" },
  "bodas/17-dos-novias-velo-palmeras": { es: "Dos novias con el velo al viento entre palmeras", en: "Two brides with their veil in the wind among palm trees", ca: "Dues núvies amb el vel al vent entre palmeres" },
  "bodas/18-beso-novios-luces-guirnalda": { es: "Beso de los novios bajo guirnaldas de luces por la noche", en: "The couple kissing under string lights at night", ca: "Petó dels nuvis sota garlandes de llums a la nit" },
  "bodas/19-pareja-bosque-contraluz": { es: "Pareja en un bosque a contraluz", en: "Couple in a forest, backlit", ca: "Parella en un bosc a contrallum" },
  "hero/01-novios-escalinata-jardin": { es: "Novios bajando la escalinata de un jardín", en: "Couple walking down the steps of a garden", ca: "Nuvis baixant l'escalinata d'un jardí" },
  "hero/02-beso-novios-luces-noche": { es: "Beso de los novios bajo guirnaldas de luces al anochecer", en: "The couple kissing under string lights at dusk", ca: "Petó dels nuvis sota garlandes de llums al vespre" },
  "hero/03-novios-puerta-buganvilla": { es: "Novios enmarcados por una puerta con buganvillas", en: "Couple framed by a doorway with bougainvillea", ca: "Nuvis emmarcats per una porta amb buguenvíl·lees" },
  "team/01-manuel-fotografo": { es: "Manuel, fotógrafo de Satori Arts, con su cámara junto a una laguna glaciar", en: "Manuel, Satori Arts photographer, with his camera by a glacier lagoon", ca: "Manuel, fotògraf de Satori Arts, amb la seva càmera al costat d'una llacuna glacial" },
  "team/02-stephanie-video": { es: "Stephanie, videógrafa de Satori Arts, al atardecer", en: "Stephanie, Satori Arts videographer, at sunset", ca: "Stephanie, videògrafa de Satori Arts, al capvespre" },
  "hoteles/01-suite-hotel-salon-ventanales": { es: "Salón de una suite de hotel con grandes ventanales y butacas", en: "Hotel suite lounge with large windows and armchairs", ca: "Saló d'una suite d'hotel amb grans finestrals i butaques" },
  "hoteles/02-kimpton-vividora-barcelona-entrada": { es: "Pareja en la entrada del hotel Kimpton Vividora Barcelona", en: "Couple at the entrance of the Kimpton Vividora Barcelona hotel", ca: "Parella a l'entrada de l'hotel Kimpton Vividora Barcelona" },
  "hoteles/03-coctel-barra-hotel": { es: "Cóctel sobre la barra del bar de un hotel", en: "Cocktail on a hotel bar counter", ca: "Còctel sobre la barra del bar d'un hotel" },
  "hoteles/04-habitacion-hotel-cama": { es: "Habitación de hotel con cama doble e iluminación cálida", en: "Hotel room with a double bed and warm lighting", ca: "Habitació d'hotel amb llit doble i il·luminació càlida" },
  "hoteles/05-hotel-glass-fachada-noche": { es: "Fachada iluminada de Glass por la noche", en: "Glass façade lit up at night", ca: "Façana il·luminada de Glass a la nit" },
  "hoteles/06-terraza-hotel-desayuno": { es: "Terraza de hotel con desayuno servido en una mesa de mármol", en: "Hotel terrace with breakfast served on a marble table", ca: "Terrassa d'hotel amb esmorzar servit en una taula de marbre" },
  "hoteles/07-terraza-lounge-montana": { es: "Terraza lounge de un hotel con vistas a la montaña", en: "Hotel lounge terrace with mountain views", ca: "Terrassa lounge d'un hotel amb vistes a la muntanya" },
  "hoteles/08-tabla-surf-kimpton-vividora": { es: "Tabla de surf con el logo de Kimpton Vividora Barcelona", en: "Surfboard with the Kimpton Vividora Barcelona logo", ca: "Taula de surf amb el logo de Kimpton Vividora Barcelona" },
  "hoteles/09-mesa-restaurante-copas": { es: "Mesa de restaurante preparada con copas y cubertería", en: "Restaurant table set with glasses and cutlery", ca: "Taula de restaurant parada amb copes i coberts" },
  "hoteles/10-lobby-hotel-sofas": { es: "Lobby de hotel con sofás y luz cálida", en: "Hotel lobby with sofas and warm light", ca: "Vestíbul d'hotel amb sofàs i llum càlida" },
  "hoteles/11-plato-alta-cocina": { es: "Emplatado de alta cocina en un restaurante", en: "Fine dining dish being plated in a restaurant", ca: "Emplatat d'alta cuina en un restaurant" },
  "hoteles/12-fachada-hotel-edificio-historico": { es: "Fachada de un hotel en un edificio histórico", en: "Hotel façade in a historic building", ca: "Façana d'un hotel en un edifici històric" },
  "hoteles/13-salon-hotel-lujo": { es: "Salón de un hotel de lujo con sofá curvo y cortinas", en: "Luxury hotel lounge with a curved sofa and curtains", ca: "Saló d'un hotel de luxe amb sofà corbat i cortines" },
  "hoteles/14-castillo-carpa-evento-noche": { es: "Castillo con una carpa iluminada para un evento al anochecer", en: "Castle with a lit marquee for an event at dusk", ca: "Castell amb una carpa il·luminada per a un esdeveniment al vespre" },
  "hoteles/15-postre-milhojas-frutos-rojos": { es: "Postre de milhojas con frutos rojos", en: "Mille-feuille dessert with red berries", ca: "Postres de milfulls amb fruits vermells" },
  "hoteles/16-hotel-montana-nieve-noche": { es: "Hotel de montaña iluminado en una noche de nieve", en: "Mountain hotel lit up on a snowy night", ca: "Hotel de muntanya il·luminat en una nit de neu" },
  "hoteles/17-hotel-hesperia-fachada-noche": { es: "Fachada iluminada de un hotel Hesperia por la noche", en: "Hesperia hotel façade lit up at night", ca: "Façana il·luminada d'un hotel Hesperia a la nit" },
  "paisaje/01-rio-turquesa-cascadas": { es: "Río de aguas turquesa entre cascadas", en: "Turquoise river between waterfalls", ca: "Riu d'aigües turquesa entre cascades" },
  "paisaje/02-ciervo-ladera-montana": { es: "Ciervo en una ladera al pie de la montaña", en: "Deer on a hillside at the foot of a mountain", ca: "Cérvol en un vessant al peu de la muntanya" },
  "paisaje/03-piramide-luna-cielo-rojo": { es: "Pirámide bajo la luna creciente con el cielo rojo", en: "Pyramid under a crescent moon with a red sky", ca: "Piràmide sota la lluna creixent amb el cel vermell" },
  "paisaje/04-meandro-rio-canon": { es: "Meandro de un río encajado en un cañón", en: "River meander carved into a canyon", ca: "Meandre d'un riu encaixat en un canyó" },
  "paisaje/05-bosque-estanque-flores": { es: "Bosque con un estanque y flores en primavera", en: "Forest with a pond and spring flowers", ca: "Bosc amb un estany i flors a la primavera" },
  "paisaje/06-aurora-boreal-montana": { es: "Aurora boreal sobre las montañas", en: "Northern lights over the mountains", ca: "Aurora boreal sobre les muntanyes" },
  "paisaje/07-amanecer-niebla-valle": { es: "Amanecer con niebla sobre un valle", en: "Sunrise with mist over a valley", ca: "Alba amb boira sobre una vall" },
  "paisaje/08-abejorro-flores-lavanda": { es: "Abejorro sobre flores lilas", en: "Bumblebee on lilac flowers", ca: "Borinot sobre flors liles" },
  "paisaje/09-picos-alpinos-flores": { es: "Picos alpinos con flores silvestres en primer plano", en: "Alpine peaks with wildflowers in the foreground", ca: "Cims alpins amb flors silvestres en primer pla" },
  "paisaje/10-aves-silueta-sol-poniente": { es: "Siluetas de aves frente al sol poniente", en: "Bird silhouettes against the setting sun", ca: "Siluetes d'ocells davant del sol ponent" },
  "paisaje/11-perezosos-abrazados": { es: "Dos perezosos abrazados", en: "Two sloths hugging", ca: "Dos peresosos abraçats" },
  "paisaje/12-montanas-nevadas-luna-noche": { es: "Montañas nevadas bajo la luna, en blanco y negro", en: "Snowy mountains under the moon, in black and white", ca: "Muntanyes nevades sota la lluna, en blanc i negre" },
  "paisaje/13-lagos-alpinos-montana": { es: "Lagos alpinos entre montañas rocosas", en: "Alpine lakes between rocky mountains", ca: "Llacs alpins entre muntanyes rocoses" },
  "paisaje/14-campo-amapolas-atardecer": { es: "Campo de amapolas al atardecer", en: "Poppy field at sunset", ca: "Camp de roselles al capvespre" },
};
