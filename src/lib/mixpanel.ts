import mixpanel from 'mixpanel-browser';

class MixpanelTracker {
  constructor() {
    this.isLocal = window.location.hostname === 'localhost';
  }

  init(){
    if (this.isLocal) {
      console.log('Mixpanel Initialized');
    } else {
      mixpanel.init('d9c5c93f3bbb1cfd22e716a960bfea2b', {
        debug: true,
        track_pageview: true,
        persistence: 'localStorage',
      });
    }
  }

  // Identify a user with a unique ID
  identify(userId) {
    if (this.isLocal) {
      console.log(userId);
    } else {
      mixpanel.identify(userId);
    }
  }

  // Assign an alias to a user
  alias(id) {
    if (this.isLocal) {
      console.log(id);
    } else {
      mixpanel.alias(id);
    }
  }

  // Track an event with optional properties
  error_track(name, props) {
    if (this.isLocal) {
      console.log(name);
    } else {
      mixpanel.track(name);
    }
  }

  trackScanner(name, props = {}) {
    if (this.isLocal) {
      console.log(name);
    } else {
      mixpanel.track(name);
    }
  }

  // Track an event with optional properties
  track(name) {
    if (this.isLocal) {
      console.log(name);
    } else {
      mixpanel.track(name);
    }
  }

  // Track an event with optional properties
  trackWithProps(name, props) {
    if (this.isLocal) {
      console.log(name, props)
    } else {
      mixpanel.track(name, props);
    }
  }

  // Set properties for a user in Mixpanel
  // From: https://docs.mixpanel.com/docs/data-structure/user-profiles
  setPeopleProperties(userId, userFirstName, userLastName, userEmail) {
    if (this.isLocal) {
      console.log(userId, userFirstName, userLastName, userEmail);
    } else {
      mixpanel.people.set({
        $first_name: userFirstName,
        $last_name: userLastName,
        $email: userEmail,
      });
      this.identify(userId);
    }
  }

   // Function to track user events directly within the class
   userEvent(eventName, userId, userEmail, userFirstName, userLastName) {
    
    if (this.isLocal) {
      console.log(userId, userFirstName, userLastName, userEmail);
      console.log(eventName);
    } else {
      this.identify(userId);
      this.track(eventName);
      this.setPeopleProperties(userId, userFirstName, userLastName, userEmail);
    }
  }
}

const mpTracker = new MixpanelTracker();
export default mpTracker;