import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingAnimation() {
  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" className="text-secondary" />
      <Text style={styles.indicatorText} className="text-white">
        Loading ...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#888',
    padding: 12,
    marginBottom: 12,
    marginLeft: 8,
    marginRight: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 24,
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    color: '#000',
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 8,
  },
});
