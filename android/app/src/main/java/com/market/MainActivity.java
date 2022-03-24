package com.market;
import com.facebook.react.ReactActivity;
//added manually
import android.os.Bundle;
//import com.rnfs.RNFSPackage;  // <--- import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "market";
  }
  
  //added manually
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
