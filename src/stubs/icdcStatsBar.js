export const data = {
  numberOfPrograms: 10,
  numberOfStudies: 10,
  numberOfCases: 10,
  numberOfSubjects: 10,
  numberOfSamples: 10,
  numberOfLabProcedures: 10,
  numberOfFiles: 10,
  numberOfAliquots: 10,
};

export const statsStyling = {
  global: {
    horizontalStyle: false,
    statTitleFirst: false,
    height: '62px',
    background: '#CBE2EE',
  },
  statsGroup: {
    margin: '4px 120px',
  },
  statsIcon: {
    width: '45px',
    height: '45px',
  },
  statCount: {
    color: '#4A4A4A',
    fontFamily: 'sans-serif',
    fontSize: '16.8px',
    margin: '6px 0px 3px 15px',
    float: 'left',
  },
  statTitle: {
    color: '#0B3556',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textTransform: 'none',
    float: 'none',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Studies',
    type: 'field',
    statAPI: 'numberOfStudies',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-studies-stats.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Cases',
    type: 'field',
    statAPI: 'numberOfCases',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-cases-stats.svg',
    statIconAlt: 'Studies Stats Bar Icon',
  },
  {
    statTitle: 'Samples',
    type: 'field',
    statAPI: 'numberOfSamples',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-samples-stats.svg',
    statIconAlt: 'Samples Stats Bar Icon',
  },
  {
    statTitle: 'Files',
    type: 'field',
    statAPI: 'numberOfFiles',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-files-stats.svg',
    statIconAlt: 'Files Stats Bar Icon',
  },
  {
    statTitle: 'Aliquots',
    type: 'field',
    statAPI: 'numberOfAliquots',
    statIconSrc: 'https://raw.githubusercontent.com/CBIIT/bento-icdc-frontend/master/src/assets/icons/Icon-aliquots-stats.svg',
    statIconAlt: 'Aliquots Stats Bar Icon',
  },
];
