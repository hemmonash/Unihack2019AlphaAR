using System;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Firebase;
using Firebase.Auth;
using Firebase.Database;
using Firebase.Unity.Editor;
using Firebase.Storage;
using System.Threading.Tasks;


public class MainUIHandler : MonoBehaviour
{
    public InputField sessionIDInput;
    public Button startSessionButton;
    public GameObject successImage;
    public Boolean redirect = false;
    public Boolean result = false;
    public static int reuqiredNumberOfPrefabs = 0;
    // Start is called before the first frame update
    void Start()
    {

        string readConfig = ReadString("Assets/Resources/config.txt");
        string[] splitArray = readConfig.Split(char.Parse(";"));
        Debug.Log("Array of config: " + splitArray[0]);

        Firebase.FirebaseApp.CheckAndFixDependenciesAsync().ContinueWith(task => {
            var dependencyStatus = task.Result;
            if (dependencyStatus == Firebase.DependencyStatus.Available)
            {
                // Create and hold a reference to your FirebaseApp,
                // where app is a Firebase.FirebaseApp property of your application class.
                FirebaseApp app = Firebase.FirebaseApp.DefaultInstance;

                // Set a flag here to indicate whether Firebase is ready to use by your app.
                Debug.Log("Firebase setup successfuly!");
            }
            else
            {
                UnityEngine.Debug.LogError(System.String.Format(
                  "Could not resolve all Firebase dependencies: {0}", dependencyStatus));
                // Firebase Unity SDK is not safe to use here.
            }
        });

        // add button listner
        startSessionButton.onClick.AddListener(StartExperience);
    }

    // Update is called once per frame
    void Update()
    {
        if (result == true)
        {
            // success, destroy button and show success image
            successImage.SetActive(true);
            startSessionButton.GetComponent<Button>().interactable = false;
            startSessionButton.GetComponent<Button>().enabled = false;
            StartCoroutine(WaitForRedirect());
        }

        Debug.Log("redirect: " + redirect.ToString());
        if (redirect == true)
        {
            // move to ARScene
            Debug.Log("Successful Auth, switching to AR scene");
            SceneManager.LoadScene("ARScene");
        }
    }

    // firebase auth function
    public void FirebaseSessionAuthFunc()
    {
        // for return

        String queryString = System.DateTime.Now.ToString("yyyy-MM-dd-HH");
        //Debug.Log(queryString);
        FirebaseApp.DefaultInstance.SetEditorDatabaseUrl("https://alpha-ar-1e5d6.firebaseio.com/");
        // Get the root reference location of the database.
        DatabaseReference reference = FirebaseDatabase.DefaultInstance.RootReference;
        FirebaseDatabase.DefaultInstance.GetReference(queryString).GetValueAsync().ContinueWith(task =>
        {
            if (task.IsFaulted)
            {
                // failed authentication

                // Handle the error...
                Debug.Log("Could not find collection");
            }
            else if (task.IsCompleted)
            {

                // authentication successful
                DataSnapshot snapshot = task.Result;
                // get the session id and compare the entered ID

                // get the session code from firebase db and comapre to entered
                String sessionIDEntered = sessionIDInput.text;
                Debug.Log("snapshot value: " + snapshot.Value.ToString());
                if (snapshot.Value.ToString() == sessionIDEntered.ToString())
                {
                    // Set true and then transition
                    // redirect now
                    // also get the number of prefabs required
                    reuqiredNumberOfPrefabs = 8;
                    string readConfig = ReadString("Assets/config.text");
                    string[] splitArray = readConfig.Split(char.Parse(";"));
                    result = true;
                    Debug.Log("Array of config: " + splitArray);
                }
            }
        });
    }

    // method for starting the experience
    public void StartExperience()
    {
        String sessionID = sessionIDInput.text;
        //Debug.Log("sessionID: " + sessionID.ToString());
        // upon click run firebase auth
        //Boolean result = FirebaseSessionAuthFunc();
        FirebaseSessionAuthFunc();
        Debug.Log("[SE] result: " + result.ToString());
        //Debug.Log("[SE] result: " + result.ToString());
        //successImage.SetActive(true);

    }

    static string ReadString(string path)
    {
        //string path = "Assets/Resources/test.txt";

        //Read the text from directly from the test.txt file
        StreamReader reader = new StreamReader(path);
        string readConfig = reader.ReadLine().ToString();
        reader.Close();

        return readConfig;
    }


    public IEnumerator WaitForRedirect()
    {
        yield return new WaitForSecondsRealtime(2);
        redirect = true;
    }
}
