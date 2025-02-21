import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Marquee } from "@animatereactnative/marquee";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  Easing,
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { Stagger } from "@animatereactnative/stagger";

import img1 from "../assets/images/Ekam/amma_bhagavan.jpg";
import img2 from "../assets/images/Ekam/krishnaji_bhagavan.jpg";
import img3 from "../assets/images/Ekam/preetha_krishna.jpg";
import img4 from "../assets/images/Ekam/sri_bhagavan.jpg";

const images = [img1, img2, img3, img4];

const { width } = Dimensions.get("window");
const _itemWidth = width * 0.62;
const _itemHeight = _itemWidth * 1.67;
const _spacing = 16;
const _itemSize = _itemWidth + _spacing;

function Item({
  image,
  index,
  offset,
}: {
  image: any;
  index: number;
  offset: SharedValue<number>;
}) {
  const _stylez = useAnimatedStyle(() => {
    const itemPosition = index * _itemSize - width - _itemSize / 2;
    const totalSize = images.length * _itemSize;

    const range =
      ((itemPosition - (offset.value + totalSize * 1000)) % totalSize) +
      width +
      _itemSize / 2;
    return {
      transform: [
        {
          rotate: `${interpolate(
            range,
            [-_itemSize, (width - _itemSize) / 2, width],
            [-3, 0, 3]
          )}degrees`,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[{ width: _itemWidth, height: _itemHeight }, _stylez]}
    >
      <Image
        source={{ uri: Image.resolveAssetSource(image).uri }}
        style={{ flex: 1, borderRadius: 16 }}
      />
    </Animated.View>
  );
}

const Feedback = () => {
  const offset = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useAnimatedReaction(
    () => {
      const floatIndex =
        ((offset.value + width / 2) / _itemSize) % images.length;
      return Math.abs(Math.floor(floatIndex));
    },
    (value) => {
      runOnJS(setActiveIndex)(value);
    }
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]}>
        <Animated.Image
          key={`image-${activeIndex}`}
          style={{ flex: 1 }}
          source={{ uri: Image.resolveAssetSource(images[activeIndex]).uri }}
          blurRadius={50}
          entering={FadeIn.duration(1000)}
          exiting={FadeOut.duration(1000)}
        />
      </View>
      <Marquee spacing={_spacing} position={offset}>
        <Animated.View
          style={{ flexDirection: "row", gap: _spacing }}
          entering={FadeInUp.delay(500)
            .duration(1000)
            .easing(Easing.elastic(0.9))
            .withInitialValues({
              transform: [{ translateY: -_itemHeight / 2 }],
            })}
        >
          {images.map((image, index) => (
            <Item
              image={image}
              index={index}
              key={`image-${index}`}
              offset={offset}
            />
          ))}
        </Animated.View>
      </Marquee>

      <Stagger
        initialEnteringDelay={1000}
        duration={500}
        stagger={100}
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 35,
        }}
      >
        <Animated.Text
          entering={FadeInUp.delay(100)}
          style={{ color: "white", fontWeight: "500", opacity: 0.6 }}
        >
          Welcome to
        </Animated.Text>
        <Animated.Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 8,
            marginTop: 1,
          }}
          entering={FadeInUp.delay(200)}
        >
          Ekam Feedback
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.delay(300)}
          style={{
            color: "white",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.8,
          }}
        >
          May Bhagwan's blessing guide us all
        </Animated.Text>
        <Animated.Text
          entering={FadeInUp.delay(400)}
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            opacity: 0.8,
            marginBottom: 10,
          }}
        >
          Your Feedback helps every experience even more meaningful. Share you
          thoughts with us.
        </Animated.Text>
        <View style={{ marginTop: 10 }}>
          <View style={styles.feedbackButton}>
            <Button
              onPress={() => {}}
              title="Fill the feedback"
              color="black"
              accessibilityLabel="Learn more about this purple button"
            ></Button>
          </View>
        </View>
      </Stagger>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackButton: {
    backgroundColor: "white",
    padding: 4,
    borderRadius: 15,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow property
    elevation: 5,
    paddingHorizontal: 8,
  },
});

export default Feedback;
