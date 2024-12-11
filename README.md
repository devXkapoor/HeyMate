# HeyMate - A React Native based App with Login/Signup Functionality

### Created by Devansh Kapoor

      Email - devanshkapoor5@gmail.com
      M - +917404404912
      LinkedIn Profile - https://www.linkedin.com/in/devanshkapoor5
      GitHub Profile - https://github.com/devXkapoor

### Direct Download link for the app (Android APK)
https://expo.dev/accounts/devxkapoor/projects/HeyMate/builds/34f57171-7660-43a1-bd38-c0473497dbc6

### Tech-Stack used
   React-Native + Expo + TypeScript => For Frontend, Interaction, and Building

   Formik + Yup => For Form Handling and Validation

   React-Native-Async-Storage - For Accessing and Manipulating with Local Storage

## (a) How to run the project

1. Download / Clone the Code
2. Navigate to the HeyMate-Master Directory

   ```bash
   cd HeyMate-master
   ```
3. Install the dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
    npx expo start
   ```

5. Run the App
   
   
   (i) Running in a Web Browser and Other Options
      
      The terminal will come up with a couple of options:
   
      › Press s │ switch to development build
   
      › Press a │ open Android

      › Press w │ open web

      › Press j │ open debugger

      › Press r │ reload app

      › Press m │ toggle menu

      › shift+m │ more tools

      › Press o │ open project code in your editor

      › Press ? │ show all commands
   
      Press the relevant keys to execute the corresponding operations

      Example - Press the w key on your laptop keyboard to preview it in a web browser

   
   (ii) Running on an Android Device
   
      Apart from the above options, a QR Code would also be generated in the terminal.
      Install the Expo Go app from Playstore and scan the QR Code preview it directly on your Android Device

8. Downloading and Installing APK in the Android Device

   Run the following command within the HeyMate-master Directory
   
   ```bash
      npx eas build -p android --profile preview
   ```

   This will start building the App to be exported

   Follow the instructions from the terminal

   Click on the link generated in the terminal to track the build logs on the Expo Website

   Once done, an option to download/install the app would appear on the website, as well as a QR Code
   would be generated in the terminal.

   Both of these can be used to download and install the required app!

   
## (b) Design Choices Made

1. **Consistent Design**: Ensured consistent use of colors, fonts, and layout for a unified visual experience.  
2. **Intuitive Navigation**: Simplified navigation with clear menus, buttons, and labels for ease of use.  
3. **Responsive Design**: Optimized the interface for seamless functionality across different devices and screen sizes.  
4. **User-Centric Features**: Incorporated user feedback and implemented features that prioritize usability and accessibility.  


## (c) Assumptions / Limitations
  
1. **Limited Testing**: Assumed the design works universally without extensive user testing on diverse demographics.  
2. **Scalability Concerns**: Current structure may not efficiently handle significant future scalability needs.  
3. **Device-Specific Performance**: Assumed optimal performance across all devices without hardware-specific optimizations.  
4. **Generalized User Base**: Assumed a general user profile without tailoring the experience for niche audiences.  
