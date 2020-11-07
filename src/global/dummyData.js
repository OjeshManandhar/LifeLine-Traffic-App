export const dummyObstruction = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [85.31822897493839, 27.694542968732563]
    },
    properties: {
      id: 1,
      createdBy: 'qwe',
      name: 'Maitighar',
      location: 'Maitighar, Kathmandu, Bagmati, Nepal',
      description: 'normal day jam'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [85.31651973724365, 27.68344257766637]
    },
    properties: {
      id: 2,
      createdBy: 'qwe',
      name: 'Hotel Himalaya',
      location: 'Hotel Himalaya, Lalitpur, Bagmati, Nepal',
      description: 'Accident'
    }
  }
];

export const dummyDriverLocations = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [85.3329174, 27.6876994]
    },
    properties: {
      id: 'qwertyuiop'
    }
  },
  {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [85.3145878, 27.6677782] },
    properties: {
      id: 'asdfghjkl'
    }
  }
];

export const dummyTrafficLocations = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [85.3187843, 27.6949837]
    },
    properties: {
      id: 1
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [85.3341016, 27.6883948]
    },
    properties: {
      id: 2
    }
  }
];

export const dummyRoute = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [
        [85.332756, 27.68738],
        [85.331917, 27.68759],
        [85.331711, 27.687864],
        [85.331001, 27.687943],
        [85.331322, 27.689091],
        [85.328842, 27.689987],
        [85.328873, 27.690104],
        [85.32019, 27.694227],
        [85.320122, 27.694477],
        [85.32029, 27.694735],
        [85.319893, 27.695618],
        [85.319099, 27.69701],
        [85.31839, 27.697683],
        [85.317474, 27.699177],
        [85.316513, 27.698936],
        [85.316231, 27.699322],
        [85.315277, 27.699562],
        [85.315048, 27.699383],
        [85.314613, 27.699623],
        [85.313751, 27.699799],
        [85.313522, 27.699718],
        [85.313408, 27.699686],
        [85.312866, 27.700191],
        [85.311852, 27.700373],
        [85.311584, 27.700554],
        [85.309975, 27.6994],
        [85.309456, 27.699703],
        [85.30899, 27.699678],
        [85.308762, 27.699503],
        [85.307846, 27.699776],
        [85.307556, 27.700428],
        [85.305244, 27.701281],
        [85.305389, 27.702042],
        [85.304398, 27.702543],
        [85.30426, 27.702332],
        [85.304031, 27.702133],
        [85.303505, 27.702175],
        [85.302711, 27.701956],
        [85.302742, 27.701891],
        [85.30188, 27.701578],
        [85.300468, 27.70163],
        [85.298508, 27.701385],
        [85.297333, 27.700941],
        [85.297531, 27.699617]
      ]
    },
    properties: {
      id: 2,
      weight: 1072.766,
      distance: 4784.403,
      duration: 764.159,
      emergency: 3,
      description: 'Gun shot',
      destination: {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [85.297547, 27.699445] },
        properties: {
          id: 'poi.180388726511',
          name: 'Kalimati Tarkari Bazaar',
          type: 'poi',
          location:
            'Kalimati Tarkari Bazaar, Kalimati, Kathmandu, Bagmati, Nepal',
          distance: '4.78'
        }
      },
      startLocation: [85.3329174, 27.6876994],
      createdBy: 'qwertyuiop'
    }
  },
  {
    type: 'Feature',
    geometry: {
      coordinates: [
        [85.315636, 27.66778],
        [85.316132, 27.667807],
        [85.316345, 27.667797],
        [85.316994, 27.662558],
        [85.318344, 27.661474],
        [85.318253, 27.661386],
        [85.323685, 27.658117],
        [85.332939, 27.667383],
        [85.349525, 27.678713],
        [85.351814, 27.67536],
        [85.38456, 27.673306],
        [85.397675, 27.67465],
        [85.408241, 27.671852],
        [85.419006, 27.666397],
        [85.429314, 27.665201],
        [85.432465, 27.666471],
        [85.43792, 27.66638],
        [85.446541, 27.661011],
        [85.453964, 27.658142],
        [85.456329, 27.65443],
        [85.45974, 27.653479],
        [85.465179, 27.648024],
        [85.465355, 27.643869],
        [85.467445, 27.642841],
        [85.470001, 27.64249],
        [85.470047, 27.643848],
        [85.475937, 27.643169],
        [85.494972, 27.631676],
        [85.502975, 27.632437],
        [85.506973, 27.631586],
        [85.509483, 27.632557],
        [85.526352, 27.629501],
        [85.526222, 27.628988],
        [85.538315, 27.62162],
        [85.537773, 27.618584]
      ],
      type: 'LineString'
    },
    properties: {
      id: 1,
      weight: 3027.785,
      duration: 2800.308,
      distance: 27268.023,
      emergency: 1,
      description: 'Headache',
      destination: {
        type: 'Feature',
        geometry: { coordinates: [85.538567, 27.618988], type: 'Point' },
        properties: {
          id: 'poi.326417559184',
          name: 'Kathmandu University',
          type: 'poi',
          location:
            'Kathmandu University, 28 Kilo, Dhulikhel N.P, Bagmati, Nepal',
          distance: 4.7
        }
      },
      startLocation: [85.3145878, 27.6677782],
      createdBy: 'asdfghjkl'
    }
  }
];
