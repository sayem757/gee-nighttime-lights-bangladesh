// nighttime_lights_analysis.js

// Configuration
var startYear = 1992; // start year for DMSP-OLS
var endYear = 2013; // end year for DMSP-OLS
var viirsStartYear = 2012; // start year for VIIRS
var viirsEndYear = 2026; // end year for VIIRS
var region = ee.Geometry.Polygon([[90.307, 20.663], [92.674, 20.663], [92.674, 26.630], [90.307, 26.630]]); // AOI Definition

// AOI Definition
var bangladesh = ee.FeatureCollection('USDOS/LSIS/2013_HumanRights_SecondaryDisplacement');

// Data Ingestion
var dmsp = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS').filter(ee.Filter.date(startYear, endYear));
var viirs = ee.ImageCollection('NOAA/VIIRS/DNB/VMOD').filter(ee.Filter.date(viirsStartYear, viirsEndYear));

// Annual Composites
var createComposite = function(year) {
  // DMSP-OLS Composite
  var dmspComposite = dmsp.filter(ee.Filter.calendarRange(year, year, 'year')).mean();
  // VIIRS Composite
  var viirsComposite = viirs.filter(ee.Filter.calendarRange(year, year, 'year')).mean();
  return dmspComposite.addBands(viirsComposite);
};

// Statistics
var calculateStats = function(image) {
  var stats = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region,
    scale: 1000
  });
  return stats;
};

// Urbanization Analysis
var urbanMask = function(image) {
  return image.gt(0).selfMask(); // Simple urban mask, customize as needed
};

// Change Detection
var changeDetection = function(start, end) {
  var diff = end.subtract(start);
  return diff;
};

// Regional Analysis
var regionalAnalysis = function(image) {
  // Example histogram generation or zonal statistics
  return image.reduceRegion({
    reducer: ee.Reducer.percentile([10, 50, 90]),
    geometry: region,
    scale: 1000
  });
};

// Visualization
Map.addLayer(bangladesh, {color: 'red'}, 'Bangladesh');
Map.setCenter(90.41, 23.685, 6);

// Export Pipeline
Export.image.toDrive({
  image: createComposite(2013),
  description: 'DMSP_VIIRS_Composite_2013',
  scale: 1000,
  region: region
});

// Data Validation
var validateData = function(image) {
  return image.select('DMSP').reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: region,
    scale: 1000
  });
};

// Summary Output
print('DMSP Statistics:', calculateStats(createComposite(2013)));
print('VIIRS Statistics:', calculateStats(createComposite(2014)));