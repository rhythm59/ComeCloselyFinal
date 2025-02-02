import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

interface ComponentProp {
  index: number;
  currentIndex: number;
  duration: number;
  active: number;
  isLoaded: boolean;
  isNewStory: boolean;
  pause: boolean;
  next: any;
}
const ProgressBar = (props: ComponentProp) => {
  const {index, currentIndex, duration, active} = props;
  const [pauseTime, setPauseTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const scale = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  const onLayoutAdded = (evt: any) => {
    setWidth(evt.width);
  };

  useEffect(() => {
    switch (active) {
      case 2:
        return scale.setValue(width);
      case 1:
        return props.isLoaded && !props.isNewStory
          ? Animated.timing(scale, {
              toValue: width,
              duration: getDuration(),
              easing: Easing.linear,
              useNativeDriver: false,
            }).start(({finished}: any) => {
              if (finished) {
                props.next();
              }
            })
          : scale.setValue(0);
      case 0:
        return scale.setValue(0);
      default:
        return scale.setValue(0);
    }
  });

  const getDuration = () => {
    const totalPlaytime = duration * 1000;

    if (props.pause) {
      return 50000;
    }

    if (pauseTime === null) {
      return totalPlaytime;
    }

    const lastTime = pauseTime - startTime;
    return totalPlaytime - lastTime;
  };

  useEffect(() => {
    if (index === currentIndex) {
      if (props.pause) {
        const endtime = Date.now();
        setPauseTime(endtime);
      }

      if (startTime === null) {
        setStartTime(Date.now());
      }
    }
  }, [currentIndex, index, props.pause, startTime]);

  return (
    <View
      onLayout={(evt) => onLayoutAdded(evt.nativeEvent.layout)}
      style={styles.container}>
      <Animated.View
        style={[
          styles.container,
          {
            width: scale,
            backgroundColor: index <= currentIndex ? 'white' : '#555',
            position: 'absolute',
            top: 0,
            margin: 0,
          },
        ]}
      />
    </View>
  );
};

ProgressBar.propTypes = {
  index: PropTypes.number,
  currentIndex: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    flex: 1,
    backgroundColor: '#555',
    margin: 2,
  },
});

export default ProgressBar;
