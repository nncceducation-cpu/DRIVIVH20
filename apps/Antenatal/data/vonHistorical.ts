// Copied unchanged from original benchmark app; historical 2023 attribution unverified.
export const VON_HISTORICAL_GA = {
  "title": "Outcomes by Gestational Age (weeks)",
  "type": "ga",
  "groups": [
    "< 24",
    "24-26",
    "27-29",
    "30-32",
    "> 32"
  ],
  "stats": [
    {
      "name": "Mortality",
      "rates": {
        "< 24": 52.9,
        "24-26": 22.6,
        "27-29": 7.7,
        "30-32": 4.2,
        "> 32": 6.7
      }
    },
    {
      "name": "Death or Morbidity",
      "rates": {
        "< 24": 94.1,
        "24-26": 75,
        "27-29": 41.2,
        "30-32": 21.8,
        "> 32": 11.7
      }
    },
    {
      "name": "CLD (<33 wks)",
      "rates": {
        "< 24": 78.6,
        "24-26": 58.1,
        "27-29": 26.5,
        "30-32": 12,
        "> 32": "N/A"
      }
    },
    {
      "name": "Severe IVH",
      "rates": {
        "< 24": 34.6,
        "24-26": 16.1,
        "27-29": 5,
        "30-32": 1.5,
        "> 32": 1.1
      }
    },
    {
      "name": "Severe ROP",
      "rates": {
        "< 24": 34.2,
        "24-26": 15.6,
        "27-29": 2.3,
        "30-32": 0.6,
        "> 32": 0.3
      }
    },
    {
      "name": "NEC",
      "rates": {
        "< 24": 10.9,
        "24-26": 8.9,
        "27-29": 5.1,
        "30-32": 2.9,
        "> 32": 1.7
      }
    },
    {
      "name": "Late Infection",
      "rates": {
        "< 24": 34.7,
        "24-26": 22.6,
        "27-29": 9.9,
        "30-32": 4.9,
        "> 32": 3.3
      }
    }
  ]
} as const;
