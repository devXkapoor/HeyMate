import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Formik, FormikHelpers, useField } from 'formik';
import * as Yup from 'yup';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


// Type Definitions
interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
}

interface PasswordInputProps {
  label: string;
  name: string;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
  children?: React.ReactNode;
}

interface CheckboxProps {
  name: string;
  children: string;
  setFieldValue: (field: string, value: any) => void;
}

// Custom TextInput Component
const MyTextInput: React.FC<TextInputProps> = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          meta.touched && meta.error ? styles.inputError : null,
        ]}
        value={field.value}
        onChangeText={(text) => helpers.setValue(text)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
    </View>
  );
};

// Custom PasswordInput Component
const MyPasswordInput: React.FC<PasswordInputProps> = ({ label, name, children, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          meta.touched && meta.error ? styles.inputError : null,
          styles.passwordInput,
        ]}
        value={field.value}
        onChangeText={(text) => {
          helpers.setValue(text)

        }}
        onBlur={() => helpers.setTouched(true)} // Mark field as touched on blur
        {...props}
      />
      {children}
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
    </View>
  );
};

// Custom Checkbox Component
const MyCheckbox: React.FC<CheckboxProps> = ({
  name,
  children,
  setFieldValue,
}) => {
  const [field, meta] = useField(name);
  return (
    <View style={styles.formControl}>
      <TouchableOpacity
        onPress={() => setFieldValue(name, !field.value)}
        style={styles.checkboxContainer}
      >
        <Text style={styles.checkbox}>
          {field.value ? '☑' : '☐'} {children}
        </Text>
      </TouchableOpacity>
      {meta.touched && meta.error && (
        <Text style={styles.error}>{meta.error}</Text>
      )}
    </View>
  );
};


// Main LoginForm Component
const LoginForm: React.FC = () => {

  const [Email, setEmail] = useState("");
  const [SavedEmail, setSavedEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();



  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        const mail = await AsyncStorage.getItem('email')
        if (mail) {
          setSavedEmail(mail)
        }
      }

      catch (error) {
        Alert.alert("Login Again")
      }
    };

    checkAsyncStorage();
  }, [])

  const initialValues: FormValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const saveAsyncData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      return 1;
    } catch (error) {
      Alert.alert('Failed to save data');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (SavedEmail || Email) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <Text style={[styles.ctaText, { fontSize: 20, fontWeight: '400', paddingHorizontal: 'auto' }]}>
          Welcome!
        </Text>
        <Text style={[styles.ctaText, { marginBottom: 20, fontSize: 20, fontWeight: '600', color: '#555' }]}>
          {SavedEmail ? SavedEmail : Email}
        </Text>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('email');
            setSavedEmail('');
            setEmail('');
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <>
      <Formik
        initialValues={initialValues}

        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must be atleast 8 characters')
            .required('Required'),
          rememberMe: Yup.boolean()
        })}

        onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
          setTimeout(async () => {
            let x;

            if (values.rememberMe === true) {
              x = await saveAsyncData('email', values.email)
              setSavedEmail(values.email)
            }
            else {
              setSavedEmail('')
            }

            setEmail(values.email)

            Alert.alert('Login Successful!', `${JSON.stringify(values, null, 2)}`
            );

            setSubmitting(false);
          }, 400);

        }}
      >
        {({ handleSubmit, setFieldValue }) => (
          <View style={styles.container}>

            <Text style={styles.header}>Login</Text>

            <MyTextInput
              label="Email Address"
              name="email"
              placeholder="devanshkapoor5@gmail.com"
              keyboardType="email-address"
            />

            <MyPasswordInput
              label="Password"
              name="password"
              placeholder="Expo@Dev954"
              secureTextEntry={!passwordVisible}
            >
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </MyPasswordInput>

            <MyCheckbox name="rememberMe" setFieldValue={setFieldValue}>
              Remember me?
            </MyCheckbox>

            <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
              <Text style={styles.buttonText}>
                Login
              </Text>
            </TouchableOpacity>

            <View style={styles.ctaLine}>
              <Text style={styles.ctaText}>
                Don't have an account yet?{' '}
              </Text>

              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={styles.ctaLink}>Signup</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </Formik >
    </>
  );
};


// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: '#333',
  },
  formControl: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  error: {
    color: '#e74c3c',
    marginTop: 4,
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative', // Needed to position the eye icon inside the input container
  },
  passwordInput: {
    paddingRight: 40, // Adjust the right padding to make space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10, // Adjust the position of the icon
    top: '70%',
    transform: [{ translateY: -12 }], // Center the icon vertically inside the input
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  ctaLine: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 16,
  },
  ctaLink: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default LoginForm;
