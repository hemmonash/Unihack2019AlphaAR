using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Firebase;
using Firebase.Database;
using Firebase.Storage;
using Firebase.Unity.Editor;
using System.Threading.Tasks;
using UnityEngine.Networking;
using System;

public class FirebaseUtils : MonoBehaviour
{
    // Start is called before the first frame update
    async void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public async void GetAssetBundleFromSession(string sessionId, System.Action<AssetBundle> todo)
    {
        Task<string> modelIdTask = GetModelIdAsync(sessionId);
        string modelId = await modelIdTask;
        Task<Uri> modelUriTask = GetModelAssetBundleUriAsync(modelId);
        Uri modelUri = await modelUriTask;
        string modelUriStr = modelUri.ToString();
        StartCoroutine(GetModelAssetBundle(modelUriStr, result => todo(result)));
    }

    private async Task<string> GetModelIdAsync(string sessionId)
    {
        string modelId = "";

        FirebaseApp.DefaultInstance.SetEditorDatabaseUrl("https://alpha-ar-1e5d6.firebaseio.com/");
        DatabaseReference reference = FirebaseDatabase.DefaultInstance.RootReference;
        Task<DataSnapshot> task = FirebaseDatabase.DefaultInstance
            .GetReference("sessions")
            .GetValueAsync();
        DataSnapshot snapshot = await task;

        IEnumerable<DataSnapshot> sessionSnapshots = snapshot.Children;
        foreach (DataSnapshot sessionSnapshot in sessionSnapshots)
        {
            String sessionSnapshotId = sessionSnapshot.Child("sessionId").Value.ToString();
            if (sessionSnapshotId.Equals(sessionId))
            {
                modelId = sessionSnapshot.Child("modelId").Value.ToString();
            }
        }

        return modelId;
    }

    private async Task<Uri> GetModelAssetBundleUriAsync(string modelId)
    {
        Uri bundleURI = null;
        Debug.Log(bundleURI);

        FirebaseStorage storage = FirebaseStorage.GetInstance("gs://alpha-ar-1e5d6.appspot.com");
        StorageReference reference = storage.GetReferenceFromUrl("gs://alpha-ar-1e5d6.appspot.com");

        string[] path = modelIdParser(modelId);
        foreach (string folder in path)
        {
            reference = reference.Child(folder);
        }
        Debug.Log(reference.Path);

        return await reference.GetDownloadUrlAsync();
    }

    private IEnumerator GetModelAssetBundle(string modelUrl, System.Action<AssetBundle> todo)
    {
        UnityWebRequest www = UnityWebRequestAssetBundle.GetAssetBundle(modelUrl);
        Debug.Log("entered here");
        yield return www.SendWebRequest();

        if(www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("success");
            todo(DownloadHandlerAssetBundle.GetContent(www));
        }

    }

    private string[] modelIdParser(string modelId)
    {
        string[] array = new string[5];
        array[0] = modelId.Substring(0, 3);
        array[1] = modelId.Substring(3, 5);
        array[2] = modelId.Substring(8, 2);
        array[3] = modelId.Substring(10, 2);
        array[4] = modelId.Substring(12);
        return array;
    }
}
