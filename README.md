```
  ____      _       _          ______ _    
 / ___|___ | | __ _| |__   ___|__  (_) | __
| |   / _ \| |/ _` | '_ \ / _ \ / /| | |/ /
| |__| (_) | | (_| | |_) | (_) / /_| |   < 
 \____\___/|_|\__,_|_.__/ \___/____|_|_|\_\
```

## Description

  Application mobile permettant de créer des playlists à plusieurs avec un système de vote pour retirer les musiques.
  
## Fonctionnalités

  - Gestion utilisateur
  - Création de groupe pour gérer une playlist
  - Gestion des votes
  - Lecture de playlists
  
## Choix techniques

### Client

  - React Native
  - React Navigation
  - Redux
  - Socket.io
  - Styled Components
  - Native Base
  - React Native Youtube
  
#### Installation

ajouter un fichier config.js a la racine de client et écrire dedans
  export const API_URL = 'http://IP_DE_VOTRE_SERVEUR_FEATHERS'
  export const API_KEY_YT = 'AIzaSyDSQAZU1QsJfQeB8TNmkwvh-5-K2Wq1w14x'  
  
### Serveur

  - Feathers
  - NeDB
  
## Licence

```text
Copyright (C) 2018 Brojob

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
