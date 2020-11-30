### Supplemental materials to the paper: Airglow data-driven modeling over a period of three solar cycles
- Python notebook (airglow_data_driven_modeling.ipynb) that contains complete analysis and results presented in the article
- input data for the machine learning techniques described in python notebook to model airglow green line (df_i5577_label_features_1964-1993.pkl) and red line (df_i6300_label_features_1964-1993.pkl). Pandas Data Frames are stored in .pkl format. They consist of:
  - airglow data (available via: https://ndmc.dlr.de/)
  - space weather indeces (downloaded from: https://omniweb.gsfc.nasa.gov/form/dx1.html)
  - thermosphere parameters (downloaded from https://ccmc.gsfc.nasa.gov/modelweb/models/nrlmsise00.php)
  - ionosphere parameters (downloaded from: https://ccmc.gsfc.nasa.gov/modelweb/models/iri2016$\_$vitmo.php)
  - Sun-Earth distance (calculated by: https://pypi.org/project/pyephem)
- output data (df_glow_1964-1993.pkl) of model GLOW (calculated by: https://github.com/scivision/ncar-glow)
