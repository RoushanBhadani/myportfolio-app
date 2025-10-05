import { StyleSheet, TextInput, View, Text } from "react-native";

function InputText({
  placeholder,
  formik,
  placeholderTextColor,
  name,
  keyboardType,
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = "center",
}) {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isError ? { borderColor: "red" } : { borderColor: "#f57b00ff" },
          multiline && styles.textArea,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[name]}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
      />
    </View>
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
  textArea: {
    height: 120,
  },
  error: {
    color: "#ff8080",
    fontSize: 13,
    marginTop: -8,
    marginBottom: 8,
  },
});

export default InputText;
