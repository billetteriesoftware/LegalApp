import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const WaterMark = ({image, children}) => {
  return (
    <View style={styles.container}>
      {/* Watermark Image */}
      <Image source={{uri: image}} style={styles.watermark} />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  watermark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3, // Increased opacity for visibility
    zIndex: 1,
    resizeMode: 'contain', // Or 'cover' depending on how you want to scale it
  },
  content: {
    zIndex: 2, // Content should appear above the watermark
    flex: 1,
  },
});

export default WaterMark;

// import React from 'react';
// import {View, Image, StyleSheet, Text} from 'react-native';

// const WaterMark = ({image, children}) => {
//   return (
//     <View style={styles.container}>
//       {/* Watermark Image */}
//       <Image source={{uri: image}} style={styles.watermark} />

//       {/* Content */}
//       <View style={styles.content}>{children}</View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//   },
//   watermark: {
//     position: 'absolute',
//     top: 0,

//     left: 0,
//     right: 0,
//     bottom: 0,
//     opacity: 0.1, // Adjust opacity for subtle watermark
//     zIndex: 1,
//     resizeMode: 'contain', // Or 'cover' depending on how you want to scale it
//   },
//   content: {
//     zIndex: 2, // Content should appear above the watermark
//     flex: 1,
//   },
// });

// export default WaterMark;
