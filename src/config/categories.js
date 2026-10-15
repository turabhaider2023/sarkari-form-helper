export const categories = [
  {
    id: 'ssc',
    path: '/ssc',
    exams: ['SSC', 'SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO', 'SSC JE'],
  },
  {
    id: 'railway',
    path: '/railway',
    exams: ['RRB', 'RRB NTPC', 'RRB Group D', 'RRB ALP'],
  },
  {
    id: 'defence',
    path: '/defence',
    exams: ['AFCAT', 'NDA', 'CDS', 'CAPF', 'Agniveer Army', 'Agniveer Navy', 'Agniveer Air Force'],
  },
  {
    id: 'bank',
    path: '/bank',
    exams: [
      'IBPS', 'IBPS PO', 'IBPS Clerk', 'IBPS RRB',
      'SBI', 'SBI PO', 'SBI Clerk',
      'RBI Grade B', 'RBI Assistant', 'NABARD', 'LIC AAO', 'EPFO', 'ESIC', 'FCI',
    ],
  },
  {
    id: 'state',
    path: '/state-exams',
    exams: ['UPPSC', 'BPSC', 'MPPSC', 'MPSC', 'TNPSC', 'DSSSB', 'Delhi Police', 'UP Police'],
  },
  {
    id: 'teaching',
    path: '/teaching',
    exams: ['CTET', 'KVS', 'NVS', 'REET', 'UPTET', 'UGC NET'],
  },
  {
    id: 'medical',
    path: '/medical',
    exams: ['NEET', 'NEET PG', 'GPAT', 'FMGE'],
  },
  {
    id: 'engineering',
    path: '/engineering',
    exams: ['JEE Main', 'GATE'],
  },
  {
    id: 'entrance',
    path: '/entrance',
    exams: ['CUET UG', 'CUET PG', 'CMAT', 'CSIR NET'],
  },
  {
    id: 'upsc',
    path: '/upsc',
    exams: ['UPSC'],
  },
  {
    id: 'other',
    path: '/more-exams',
    exams: ['India Post GDS'],
  },
  {
    id: 'kb',
    path: '/reduce-kb',
    exams: ['General'],
  },
]

export function categoryByPath(pathname) {
  const path = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname
  return categories.find((item) => item.path === path) || null
}

export function categoryOfExam(exam) {
  return categories.find((item) => item.exams.includes(exam)) || null
}
