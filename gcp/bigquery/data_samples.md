# Sample Rows from BigQuery Public Datasets

### World Bank International Debt

```
{ country_name: 'Afghanistan',
  country_code: 'AFG',
  indicator_name: 'Principal repayments on external debt, long-term (AMT, current US$)',
  indicator_code: 'DT.AMT.DLXF.CD',
  year: 2017,
  value: 203225000 }
```


### Global Real-time Air Quality

```
{ location: 'Mobile_Cle Elum',
  city: '037',
  country: 'US',
  pollutant: 'pm25',
  value: 0,
  timestamp: BigQueryTimestamp { value: '2017-09-26T20:00:00.000Z' },
  unit: 'µg/m³',
  source_name: 'AirNow',
  latitude: 47.19763,
  longitude: -120.95823,
  averaged_over_in_hours: 1 }
```

### SF Tree Census

```
{ tree_id: 45962,
  legal_status: 'Permitted Site',
  species: 'Tree(s) ::',
  address: '',
  site_order: 220,
  site_info: 'Sidewalk: Curb side : Cutout',
  plant_type: 'Tree',
  care_taker: 'Private',
  care_assistant: '',
  plant_date: BigQueryTimestamp { value: '2001-12-06T00:00:00.000Z' },
  dbh: '',
  plot_size: '',
  permit_notes: 'Permit Number 44451',
  x_coordinate: null,
  y_coordinate: null,
  latitude: null,
  longitude: null,
  location: '' }
```

### SF Bikeshare Trips

```
{ trip_id: 944732,
  duration_sec: 2618,
  start_date: BigQueryTimestamp { value: '2015-09-24T17:22:00.000Z' },
  start_station_name: 'Mezes',
  start_station_id: 83,
  end_date: BigQueryTimestamp { value: '2015-09-24T18:06:00.000Z' },
  end_station_name: 'Mezes',
  end_station_id: 83,
  bike_number: 653,
  zip_code: '94063',
  subscriber_type: 'Customer' }
```

### NOAA GSOD

**GSOD:**

```
{ stn: '030750',
  wban: '99999',
  year: '1937',
  mo: '01',
  da: '17',
  temp: 40,
  count_temp: 4,
  dewp: 37.8,
  count_dewp: 4,
  slp: 998.4,
  count_slp: 4,
  stp: 9999.9,
  count_stp: 0,
  visib: 7.5,
  count_visib: 4,
  wdsp: '25.0',
  count_wdsp: '4',
  mxpsd: '52.1',
  gust: 999.9,
  max: 44.1,
  flag_max: '*',
  min: 34,
  flag_min: null,
  prcp: 0,
  flag_prcp: 'I',
  sndp: 999.9,
  fog: '0',
  rain_drizzle: '0',
  snow_ice_pellets: '0',
  hail: '0',
  thunder: '0',
  tornado_funnel_cloud: '0' }
```

**Stations (`stn`):**

```
{ usaf: '007026',
  wban: '99999',
  name: 'WXPOD 7026',
  country: 'AF',
  state: '',
  call: '',
  lat: 0,
  lon: 0,
  elev: '+7026.0',
  begin: '20140711',
  end: '20170822' }
```

### NOAA ICOADS Core

```
{ year: 2014,
  month: 12,
  day: 4,
  hour: 5,
  latitude: 19.3,
  longitude: -66.5,
  imma_version: 1,
  attm_count: 4,
  time_indicator: 0,
  latlong_indicator: 0,
  ship_course: 7,
  ship_speed: 4,
  national_source_indicator: null,
  id_indicator: 0,
  callsign: 'GL',
  country_code: '',
  wind_direction_indicator: 0,
  wind_direction_true: 70,
  wind_speed_indicator: 3,
  wind_speed: 10.3,
  visibility_indicator: null,
  visibility: 98,
  present_weather: 80,
  past_weather: 1,
  sea_level_pressure: 1021,
  characteristic_of_ppp: 4,
  amt_pressure_tend: 0,
  indicator_for_temp: 0,
  air_temperature: 25,
  wbt_indicator: 0,
  wetbulb_temperature: 22,
  dpt_indicator: null,
  dewpoint_temperature: 20.7,
  sst_measurement_method: 3,
  sea_surface_temp: 27,
  total_cloud_amount: 1,
  lower_cloud_amount: 1,
  low_cloud_type: '2',
  cloud_height_indicator: null,
  cloud_height: '7',
  middle_cloud_type: 'A',
  high_cloud_type: 'A',
  wave_direction: null,
  wave_period: 2,
  wave_height: 2.5,
  swell_direction: 1,
  swell_period: 2,
  swell_height: 2.5,
  box_system_indicator: '',
  ten_degree_box_number: 279,
  one_degree_box_number: 96,
  deck: 992,
  source_id: 114,
  platform_type: 5,
  dup_status: 1,
  dup_check: 2,
  track_check: null,
  pressure_bias: null,
  wave_period_indicator: null,
  swell_period_indicator: null,
  second_country_code: null,
  adaptive_qc_flags: '',
  nightday_flag: 1,
  trimming_flags: '111111',
  ncdc_qc_flags: '11111111111111',
  external: null,
  landlocked_flag: null,
  source_exclusion_flags: null,
  unique_report_id: 'CVFDFZ',
  release_no_primary: 3,
  release_no_secondary: 0,
  release_no_tertiary: 0,
  release_status_indicator: 2,
  intermediate_reject_flag: 1,
  timestamp: BigQueryTimestamp { value: '2014-12-04T05:00:00.000Z' } }
```


### Medicare

```
{ drg_definition: '164 - MAJOR CHEST PROCEDURES W CC',
  provider_id: 20001,
  provider_name: 'PROVIDENCE ALASKA MEDICAL CENTER',
  provider_street_address: 'BOX 196604',
  provider_city: 'ANCHORAGE',
  provider_state: 'AK',
  provider_zipcode: 99508,
  hospital_referral_region_description: 'AK - Anchorage',
  total_discharges: 11,
  average_covered_charges: 181591,
  average_total_payments: 32837.18182,
  average_medicare_payments: 31369.18182 }
```
