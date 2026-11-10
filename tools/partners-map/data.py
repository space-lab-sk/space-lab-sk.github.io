"""Partners shown on the home-page map (index.html, section #partners).

Edit this file, then run `npm run map` in this folder (see README.md).

PLACES: map point key -> (label on the map, country, label side, [title in the detail card])
  label side: 'right' | 'left' | 'top' | 'bottom' for points on the map;
  'edge' for places outside the map extent (Kiruna, Boston, Yerevan), drawn as pills.
  Coordinates of every point are in places.json.

INST: one row per institution -> (place key, name, collaboration text, URL or None, own site?)
  own=True marks our own sites (Košice department, Lomnický štít); they are not counted as partners.
"""
# place key -> (display city, country, label side)
PLACES = {
 'kosice':    ('Košice', 'Slovakia', 'bottom'),
 'lomnica':   ('Lomnický štít', 'Slovakia', 'top'),
 'bratislava':('Bratislava', 'Slovakia', 'bottom'),
 'prague':    ('Prague', 'Czechia', 'top'),
 'graz':      ('Graz', 'Austria', 'bottom'),
 'neustrelitz':('Neustrelitz', 'Germany', 'right'),
 'wessling':  ('Munich', 'Germany', 'left', 'Munich / Oberpfaffenhofen'),
 'uccle':     ('Brussels', 'Belgium', 'left', 'Brussels / Leuven'),
 'kiruna':    ('Kiruna', 'Sweden', 'right'),
 'turin':     ('Turin', 'Italy', 'left'),
 'genoa':     ('Genoa', 'Italy', 'right'),
 'madrid':    ('Madrid', 'Spain', 'right'),
 'toulouse':  ('Toulouse', 'France', 'left'),
 'paris':     ('Paris', 'France', 'top'),
 'mssl':      ('London', 'United Kingdom', 'top', 'London / Holmbury St Mary'),
 'boston':    ('Boston', 'United States', 'edge'),
 'yerevan':   ('Yerevan', 'Armenia', 'edge'),
}
# (place, institution, projects, url or None, own?)
INST = [
 ('kosice', 'Department of Space Physics, IEP SAS', 'Our department — instruments, data and models', None, True),
 ('kosice', 'Technical University of Košice', 'SCSS-Net · ASPIS · SK-S2P-Edu · SWE Toolkit', 'https://uui.fei.tuke.sk/sk', False),
 ('kosice', 'Pavol Jozef Šafárik University in Košice', 'Space physics courses · cooperating students', 'https://www.upjs.sk/en/', False),
 ('kosice', 'GlobalLogic Slovakia', 'ASPIS', 'https://www.globallogic.com/sk/', False),
 ('kosice', 'Global Singularity', 'SWE Toolkit', 'https://globalsingularity.ai/', False),
 ('kosice', 'CTRL', 'STEPHANIK · satellite platform', 'https://ctrl1.eu/', False),
 ('kosice', 'Deutsche Telekom IT Solutions Slovakia', 'Building the East Slovak Space Cluster', 'https://www.innovlab.sk/', False),
 ('lomnica', 'Space Physics Laboratory at Lomnický štít', 'Our laboratory — neutron monitor since 1981', 'lomnicky-stit.html', True),
 ('lomnica', 'Astronomical Institute, Slovak Academy of Sciences', 'SK-S2P · shares the Lomnický štít facilities', 'https://www.astro.sk/', False),
 ('bratislava', 'Comenius University Bratislava', 'SK-S2P · SK-S2P-Edu', 'https://fmph.uniba.sk/daa/', False),
 ('bratislava', 'Astros Solutions', 'SK-S2P · STEPHANIK', 'https://astros.sk/', False),
 ('bratislava', 'Needronix', 'STEPHANIK · satellite platform', 'https://needronix.eu/', False),
 ('bratislava', 'BizzCom', 'STEPHANIK · satellite platform', 'https://bizzcom.sk/', False),
 ('prague', 'Institute of Atmospheric Physics, Czech Academy of Sciences', 'QUID-REGIS · Doppler sounding · electric field mill at Lomnický štít', 'https://www.ufa.cas.cz/en/homepage-en/', False),
 ('prague', 'Nuclear Physics Institute, Czech Academy of Sciences', 'ESADOS · aircrew dosimetry · thunderstorm gamma spectrometry', 'https://www.ujf.cas.cz/en/', False),
 ('graz', 'Space Research Institute, Austrian Academy of Sciences (IWF)', 'BepiColombo · SERENA/PICAM', 'https://www.iwf.oeaw.ac.at/en/', False),
 ('neustrelitz', 'DLR — Institute for Solar-Terrestrial Physics', 'ASPIS follow-up · ionospheric disturbances', 'https://www.dlr.de/en/so', False),
 ('wessling', 'DLR — German Aerospace Center', 'QUID-REGIS · ionospheric disturbances', 'https://www.dlr.de/en/dlr/locations-and-offices/oberpfaffenhofen', False),
 ('uccle', 'Royal Observatory of Belgium', 'SCSS-Net · SWE Toolkit', 'https://www.astro.oma.be/en/', False),
 ('uccle', 'KU Leuven', 'Joint PhD study', 'https://www.kuleuven.be/english/', False),
 ('kiruna', 'IRF — Swedish Institute of Space Physics', 'JUICE PEP/JDC · ACM integration', 'https://www.irf.se/en/', False),
 ('turin', 'Politecnico di Torino', 'Vigil-ML · machine learning for Vigil', 'https://ipl.polito.it/', False),
 ('genoa', 'University of Genoa', 'SWE Toolkit', 'https://unige.it/en', False),
 ('madrid', 'ALTER Technology', 'STEPHANIK · satellite platform', 'https://www.altertechnology-group.com/', False),
 ('toulouse', 'ONERA — French Aerospace Lab', 'SWE Toolkit', 'https://www.onera.fr/en', False),
 ('paris', 'Augura Space', 'SWE Toolkit', 'https://auguraspace.com/en/', False),
 ('mssl', 'Mullard Space Science Laboratory, UCL', 'SWE Toolkit', 'https://www.ucl.ac.uk/mssl/', False),
 ('yerevan', 'Yerevan Physics Institute', 'SEVAN particle detector network', 'http://crd.yerphi.am/', False),
 ('boston', 'Boston University', 'All-sky imaging · airglow', 'https://www.bu.edu/csp/', False),
]
