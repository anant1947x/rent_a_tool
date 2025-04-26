#include  <bits/stdc++.h>
using namespace std;
int main(){
    vector<int>nums={1,1,1,2,2};
    int k=2;
    unordered_map<int,int>m;
        for (auto &i: nums){
            m[i]++;
        }
        vector<pair<int,int>>vec;
        for (auto i: m){
            vec.push_back({i.second,i.first});
        }
        sort(vec.begin(),vec.end());
        reverse(vec.begin(),vec.end());
        int count=0;
        for (auto i :vec){
            count++;
            if (count>k) break;
            cout<<i.second<<endl;
        }
        
}