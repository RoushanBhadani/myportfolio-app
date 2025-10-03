import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import GradientWrapper from '../../components/LinearGradient'

function ContactUs() {
  return (
    <GradientWrapper margin={16}>
      <View style={{ flexDirection: "row", alignItems:'center', marginBottom: 15, }}>
        <View
          style={{
            width: 6,
            height: 22,
            backgroundColor: "#f57b00ff",
            marginRight: 10,
          }}
        ></View>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Contact Me
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          
          placeholder="First Name *"
          placeholderTextColor={'#616161ff'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          
          placeholder="Last Name "
          placeholderTextColor={'#616161ff'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          
          placeholder="Email *"
          placeholderTextColor={'#616161ff'}
          keyboardType="email"
        />
        <TextInput
          style={styles.input}
          
          placeholder="Mobile Number *"
          placeholderTextColor={'#616161ff'}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          
          placeholder="Mobile Number *"
          placeholderTextColor={'#616161ff'}
          numberOfLines={5}
        />
      </View>
    </GradientWrapper>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor:'#f57b00ff',
    color:'#ffffff'
  },
});

export default ContactUs