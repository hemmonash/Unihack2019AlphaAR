using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class APIUtils : MonoBehaviour
{
    // Start is called before the first frame update
    IEnumerator Start()
    {
        string wikiJSON = "";
        yield return StartCoroutine(GetWikiJSON("Hello", result => wikiJSON = result));
        Debug.Log(ParseSummaryFromJSON(wikiJSON));
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public IEnumerator GetWikiJSON(string word, System.Action<string> result)
    {
        string titleReq = "https://simple.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles={0}";

        UnityWebRequest www = UnityWebRequest.Get(string.Format(titleReq, word));
        yield return www.SendWebRequest();
        if(www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            result(www.downloadHandler.text);
        }
    }

    private string ParseSummaryFromJSON(string titleJSON)
    {
        string titleStart = "\"extract\": ";
        int titleIndex = titleJSON.IndexOf(titleStart) + titleStart.Length;
        string 
    }
}
