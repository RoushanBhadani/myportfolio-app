import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from "react-native";
import { useFormik } from "formik";

import GradientWrapper from "../../components/LinearGradient";
import {
  initialValues,
  validationSchema,
} from "../../components/formValidationSchema";
import InputText from "../../components/InputText";
import axios from "axios";
const API_URL = "https://portfolio-api-tau-liard.vercel.app/api/users";

function ContactUs() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          mobile: values.phone,
          description: values.message,
        };

        const response = await axios.post(API_URL, payload);
        Alert.alert("Success", "Your message has been sent successfully!");
        resetForm();
      } catch (error) {

        let errorMessage = "Failed to send message. Please try again later.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }

        Alert.alert("Error", errorMessage);
      }
    },
  });

  return (
    <GradientWrapper margin={16}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <View
              style={{
                width: 6,
                height: 22,
                backgroundColor: "#f57b00ff",
                marginRight: 10,
              }}
            />
            <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: "600" }}>
              Contact Me
            </Text>
          </View>

          <View>
            <InputText
              placeholder="First Name *"
              placeholderTextColor="#616161ff"
              name="firstName"
              formik={formik}
            />

            <InputText
              name="lastName"
              placeholder="Last Name"
              placeholderTextColor="#616161ff"
              formik={formik}
            />

            <InputText
              name="email"
              placeholder="Email *"
              placeholderTextColor="#616161ff"
              keyboardType="email-address"
              formik={formik}
            />

            <InputText
              name="phone"
              formik={formik}
              placeholder="Mobile Number *"
              placeholderTextColor="#616161ff"
              keyboardType="phone-pad"
            />

            <InputText
              name="message"
              formik={formik}
              placeholder="Message *"
              placeholderTextColor="#616161ff"
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
            />

            <Pressable
              style={[
                styles.button,
                formik.isSubmitting && styles.buttonDisabled,
              ]}
              onPress={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f57b00ff",
    color: "#ffffff",
    borderRadius: 5,
  },
  descriptionBox: {
    height: 120,
    fontSize: 16,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#f57b00ff",
    color: "#ffffff",
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "#f57b00ff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f57b00ff",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#8c4600",
    borderColor: "#8c4600",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  error: {
    color: "#ff8080",
    fontSize: 13,
    marginTop: -8,
    marginBottom: 8,
  },
});

export default ContactUs;
