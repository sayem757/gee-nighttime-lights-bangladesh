# Usage Guide - Nighttime Lights Analysis for Bangladesh

## Overview
This guide provides step-by-step instructions for using the Google Earth Engine JavaScript pipeline to analyze nighttime lights in Bangladesh.

## Prerequisites
- Google Earth Engine Account (free, sign up at https://earthengine.google.com)
- Basic understanding of GEE Code Editor
- Web browser with internet connection

## Getting Started

### Step 1: Access Google Earth Engine Code Editor
1. Go to https://code.earthengine.google.com/
2. Sign in with your Google account
3. You should see the Code Editor interface

### Step 2: Copy the Script
1. Open the file `nighttime_lights_analysis.js` from this repository
2. Copy the entire script content
3. Paste it into the GEE Code Editor (left panel)

### Step 3: Configure Parameters (Optional)
Edit the configuration section at the top of the script to customize analysis parameters.

### Step 4: Run the Script
1. Click the **"Run"** button (top panel)
2. Wait for the script to process (2-5 minutes)
3. Watch the Console tab for progress messages
4. Maps will appear in the Map panel automatically

### Step 5: View Results

Maps Display includes:
- Bangladesh Boundary (red outline)
- District Boundaries (blue outlines)
- Key Year Nighttime Lights for 1992, 2000, 2010, 2020, and latest year
- Urban Gradient Classification

Charts Display:
1. Mean Nighttime Light Intensity Over Time
2. Urbanized Area Expansion Over Time

### Step 6: Interact with the Map
- Zoom: Use scroll wheel or zoom buttons
- Pan: Click and drag
- Toggle Layers: Check/uncheck layer names in the Layers panel
- Inspect Values: Click on a pixel to see its value

### Step 7: Export Data

The script creates export tasks automatically:
1. Click the "Tasks" tab (⊕ icon, top right)
2. For each task, click "RUN"
3. Configure export settings
4. Click "RUN" in the dialog
5. Files will save to your Google Drive

Available Exports:
- Annual Nighttime Light Rasters (GeoTIFF)
- Time Series Statistics (CSV)
- District-Level Statistics (CSV)
- Urban Masks (GeoTIFF)

## Output Files

In Google Drive (Folder: GEE_Bangladesh_Nighttime_Lights/):

1. **Bangladesh_Nighttime_Lights_YYYY.tif**
   - Format: GeoTIFF
   - Projection: UTM Zone 46N
   - Resolution: 1 km

2. **timeseries_statistics.csv**
   - Columns: year, mean_light, sum_light, std_dev, pixel_count

3. **district_statistics.csv**
   - District-level temporal statistics

4. **Bangladesh_UrbanMask_YYYY.tif**
   - Binary urban/non-urban classification

## Troubleshooting

### Script runs but no maps appear
- Check Console for error messages
- Ensure Bangladesh geometry is correctly loaded
- Verify dataset names are correct

### Export tasks fail
- Check your Google Drive storage space
- Ensure write permissions to Google Drive
- Try with smaller regions or coarser resolution

### Memory limit exceeded
- Reduce number of years analyzed
- Increase export_scale (coarser resolution)
- Process data in chunks by decade

### Data gaps in time series
- Some years may have missing DMSP-OLS or VIIRS data
- Check available years in Console output
- Use interpolation if needed for analysis

## Interpreting Results

### Time Series Chart
- Upward trend: Increasing urbanization and economic activity
- Stable trend: Consistent urban pattern
- Sharp increase: Rapid urbanization event

### Urban Mask Analysis
- Red pixels: High urbanization (bright lights)
- Yellow pixels: Medium urbanization
- Black pixels: Non-urbanized areas

## References

### Datasets Used
1. DMSP-OLS: https://developers.google.com/earth-engine/datasets/catalog/NOAA_DMSP-OLS_NIGHTTIME_LIGHTS
2. VIIRS: https://developers.google.com/earth-engine/datasets/catalog/NOAA_VIIRS_DNB_MONTHLY_V1_VCMSLCFG
3. FAO GAUL: https://developers.google.com/earth-engine/datasets/catalog/FAO_GAUL_2015_level0

### Useful Resources
- GEE Documentation: https://developers.google.com/earth-engine
- GEE Tutorials: https://developers.google.com/earth-engine/tutorials
- GEE Community Forums: https://groups.google.com/forum/#!forum/google-earth-engine-developers