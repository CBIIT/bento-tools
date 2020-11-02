export const data = {
  numberOfPrograms: 10,
  numberOfStudies: 10,
  numberOfSubjects: 10,
  numberOfSamples: 10,
  numberOfLabProcedures: 10,
  numberOfFiles: 10,
};

export const statsStyling = {
  global: {
    horizontalStyle: true,
    statTitleFirst: true,
    height: '47px',
    background: '#8DCAFF',
  },
};

export const globalStatsData = [
  // A maximum of 6 stats are allowed
  {
    statTitle: 'Programs',
    datatable_field: 'program',
    type: 'field',
    statAPI: 'numberOfPrograms',
  },
  {
    statTitle: 'Arms',
    datatable_field: 'study_acronym',
    type: 'field',
    statAPI: 'numberOfStudies',
  },
  {
    statTitle: 'Cases',
    datatable_field: 'subject_id',
    type: 'field',
    statAPI: 'numberOfSubjects',
  },
  {
    statTitle: 'samples',
    type: 'array',
    datatable_field: 'samples',
    statAPI: 'numberOfSamples',
  },
  {
    statTitle: 'Assays',
    type: 'array',
    datatable_field: 'lab_procedures',
    statAPI: 'numberOfLabProcedures',
  },
  {
    statTitle: 'files',
    type: 'object',
    datatable_field: 'files',
    datatable_sub_field: 'file_id',
    statAPI: 'numberOfFiles',
  },
];
