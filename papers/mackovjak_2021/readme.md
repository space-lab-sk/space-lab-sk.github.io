## Airglow data-driven modeling over a period of three solar cycles
### Supplemental materials to the paper: 
- Python notebook ([airglow_data_driven_modeling.ipynb](/papers/mackovjak_2021/airglow_data_driven_modeling.ipynb)) that contains complete analysis and results presented in the article

- Pandas Data Frame with data for the machine learning techniques described in the [Python notebook](/papers/mackovjak_2021/airglow_data_driven_modeling.ipynb) to model airglow green line ([df_i5577_label_features_1964-1993.pkl](/papers/mackovjak_2021/df_i5577_label_features_1964-1993.pkl)) and red line ([df_i6300_label_features_1964-1993.pkl](/papers/mackovjak_2021/df_i6300_label_features_1964-1993.pkl)). 
Data Frame consists of:
  - airglow data (available via: https://ndmc.dlr.de/)
  - space weather indeces (downloaded from: https://omniweb.gsfc.nasa.gov/form/dx1.html)
  - thermosphere parameters (downloaded from https://ccmc.gsfc.nasa.gov/modelweb/models/nrlmsise00.php)
  - ionosphere parameters (downloaded from: https://ccmc.gsfc.nasa.gov/modelweb/models/iri2016$\_$vitmo.php)
  - Sun-Earth distance (calculated by: https://pypi.org/project/pyephem)
  
- Pandas Data Frame ([df_glow_1964-1993.pkl](/papers/mackovjak_2021/df_glow_1964-1993.pkl)) that contain airglow intensities calculated by the GLOW model (calculated by: https://github.com/scivision/ncar-glow)
