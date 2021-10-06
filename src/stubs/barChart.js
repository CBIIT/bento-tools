export const data = {
    studySampleSiteCount: [
        {
            "group": "Blood",
            "count": 26
        },
        {
            "group": "Brain",
            "count": 81
        },
        {
            "group": "Cerebellar",
            "count": 23
        },
        {
            "group": "Hemispheric",
            "count": 175
        },
        {
            "group": "Kidney",
            "count": 6
        },
        {
            "group": "Liver",
            "count": 5
        },
        {
            "group": "Liver, Spleen, Heart",
            "count": 2
        },
        {
            "group": "Lung",
            "count": 2
        },
        {
            "group": "Midline",
            "count": 43
        },
        {
            "group": "Muscle",
            "count": 10
        }
    ]
}

export const palette = ['#62beeb', '#1651ea', '#a1df71', '#72d1d5', '#d98548'];

//** argument or y-axis config */
export const argument = {
    field: 'group',
    visible: false,
    position: 'inside',
    size: 16,
    title: {
      text: 'Sample site'
    },
    label: {
      size: 20,
      position: 'inside',
      staggeringSpacing: 10,
    }
}

//** value or x-axis config */
export const value = { 
    field: 'count',
    size: 22,
    allowDecimals: false,
    title: {
      text: 'Sample count',
      size: 16,
    },
    chartGrid: {
      visible: false,
    },
    label: {
      size: 16,
      position: 'outside',
    }
}
