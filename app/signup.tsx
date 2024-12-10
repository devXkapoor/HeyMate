import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Type Definitions
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
  handlePasswordChange: any;
  placeholder?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
  children?: React.ReactNode;
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
const MyPasswordInput: React.FC<PasswordInputProps> = ({ label, name, handlePasswordChange, children, ...props }) => {
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
        onChangeText={(text) => {
          helpers.setValue(text)
          handlePasswordChange(text);

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


// Main SignupForm Component
const SignupForm: React.FC = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const router = useRouter();


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (password: string) => {
    setPasswordStrength(getPasswordStrength(password));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 12) {
      strength++;
    } else if (password.length >= 8) {
      strength += 0.5;
    }

    if (/[A-Z]/.test(password)) {
      strength++;
    }

    if (/[a-z]/.test(password)) {
      strength++;
    }

    if (/\d/.test(password)) {
      strength++;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength++;
    }

    const commonPatterns = [
      'password', '12345', 'qwerty', 'abc123', 'letmein', 'welcome', 'admin', 'iloveyou'
    ];
    if (commonPatterns.some((pattern) => password.toLowerCase().includes(pattern))) {
      return 'Weak';
    }

    const uniqueChars = new Set(password.split('')).size;
    if (uniqueChars > 6) {
      strength++;
    }

    if (strength <= 2) {
      return 'Weak';
    } else if (strength <= 3) {
      return 'Fair';
    } else if (strength <= 4) {
      return 'Good';
    } else {
      return 'Strong';
    }
  };

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Must be atleast 8 characters')
          .required('Required'),
      })}
      onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setTimeout(() => {
          Alert.alert('Sign Up Successful!', JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ handleSubmit, values }) => (
        <View style={styles.container}>
          <Text style={styles.header}>Sign up</Text>

          <MyTextInput label="First Name" name="firstName" placeholder="Devansh" />
          <MyTextInput label="Last Name" name="lastName" placeholder="Kapoor" />
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
            handlePasswordChange={handlePasswordChange}
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
          {
            (values.password.length > 0) &&
            (<View style={styles.strengthContainer}>
              <Text style={styles.strengthLabel}>Password Strength: {passwordStrength}</Text>
              <View
                style={[
                  styles.strengthBar,
                  {
                    backgroundColor:
                      passwordStrength === 'Weak'
                        ? 'red'
                        : passwordStrength === 'Fair'
                          ? 'orange'
                          : passwordStrength === 'Good'
                            ? 'yellow'
                            : 'green',
                  },
                ]}
              />
            </View>)
          }

          <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.ctaLine}>
            <Text style={styles.ctaText}>
              Already have an account?{' '}
            </Text>

            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.ctaLink}>Login</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}
    </Formik>
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
    marginTop: 12,
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
  strengthContainer: {
    marginBottom: 16,
  },
  strengthLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  strengthBar: {
    height: 8,
    borderRadius: 5,
    width: '100%',
  },
});

export default SignupForm;
