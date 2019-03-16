using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Database;
using Firebase.Unity.Editor;
using System.Threading.Tasks;

public class FirebaseUtils : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        Session session = getSessionData("123456");
        string model = session.GetModel();

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public class Session
    {
        string model;
        string teacher;
        string datetime;

        public Session(DataSnapshot sessionSnapshot)
        {
            model = (string)sessionSnapshot.Child("model").Value;
            teacher = (string)sessionSnapshot.Child("teacher").Value;
            datetime = (string)sessionSnapshot.Child("datetime").Value;
        }

        public string GetModel()
        {
            return model;
        }
    }

    private Session getSessionData(string sessionID)
    {
        Session session = null;

        FirebaseApp.DefaultInstance.SetEditorDatabaseUrl("https://alpha-ar-1e5d6.firebaseio.com/");
        DatabaseReference reference = FirebaseDatabase.DefaultInstance.RootReference;
        FirebaseDatabase.DefaultInstance
            .GetReference("sessions")
            .GetValueAsync().ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    Debug.Log(task.ToString());
                }
                else if (task.IsCompleted)
                {
                    DataSnapshot snapshot = task.Result;
                    DataSnapshot sessionSnapshot = snapshot.Child(sessionID);
                    session = new Session(sessionSnapshot);
                }
            });

        return session;
    }

    private AssetBundle GetModelAssetBundle(string modelID)
    {

    }
}
