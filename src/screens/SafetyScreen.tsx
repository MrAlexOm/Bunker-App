import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface Point {
  id: string;
  type: string;
  coords: { lat: number; lng: number };
  name: {
    ru: string;
    en: string;
    es: string;
    ar: string;
    zh: string;
  };
}

interface PointWithDistance extends Point {
  distance?: number;
}

const SafetyScreen = () => {
  const [points, setPoints] = useState<PointWithDistance[]>([]);
  const [locationError, setLocationError] = useState<string>('');
  const { data, language, t, isRTL } = useLanguage();

  // Convert degrees to radians
  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };

  // Haversine formula to calculate distance between two points
  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getCurrentLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  useEffect(() => {
    const loadPointsWithDistance = async () => {
      try {
        const mapPoints: Point[] = data.mapPoints.points;
        
        // Try to get user location
        try {
          const position = await getCurrentLocation();
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          // Calculate distances
          const pointsWithDistance = mapPoints.map(point => ({
            ...point,
            distance: getDistanceFromLatLonInKm(userLat, userLng, point.coords.lat, point.coords.lng)
          }));

          // Sort by distance
          pointsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
          setPoints(pointsWithDistance);
        } catch (error) {
          console.log('Location error:', error);
          setLocationError('Location unavailable');
          // Show points without distances
          setPoints(mapPoints);
        }
      } catch (error) {
        console.error('Error loading points:', error);
      }
    };

    loadPointsWithDistance();
  }, [data, language]);

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'water': return '💧';
      case 'shelter': return '🛡';
      case 'aid': return '🏥';
      default: return '📍';
    }
  };

  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} м`;
    }
    return `${distance.toFixed(1)} км`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('safePlaces')}</Text>
      
      {locationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>� {locationError}</Text>
        </View>
      )}

      {points.map((point, index) => (
        <View key={point.id} style={styles.pointCard}>
          <View style={[
            styles.pointHeader,
            isRTL && styles.rtlPointHeader
          ]}>
            <Text style={styles.pointType}>{getPointIcon(point.type)}</Text>
            <Text style={styles.pointName}>
              {point.name[language as keyof typeof point.name]}
            </Text>
          </View>
          {point.distance !== undefined && (
            <Text style={[
              styles.pointDistance,
              isRTL && styles.rtlPointDistance
            ]}>
              <Text>📍 </Text>{formatDistance(point.distance)}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#2A1A1A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
  pointCard: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    padding: 20,
    marginBottom: 15,
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pointType: {
    fontSize: 24,
    marginRight: 15,
  },
  pointName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  pointDistance: {
    color: '#FFD60A',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  rtlPointHeader: {
    flexDirection: 'row-reverse',
  },
  rtlPointDistance: {
    textAlign: 'left',
  },
});

export default SafetyScreen;
